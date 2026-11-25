// SPDX-FileCopyrightText: 2023-2025 Open Pioneer project (https://github.com/open-pioneer)
// SPDX-License-Identifier: Apache-2.0
//
// Template from ai-e2e-workflow: frameworks/e2e-open-pioneer-trails/map-model-helpers.ts
// Workflow version: <tag or commit>   <- fill in when copying into a project
//
// Copy to e.g. `tests/e2e/support/map-model-helpers.ts` in the application repository.
// Project-specific helpers belong in a separate file next to it that imports from this one.
// Rules and app-side setup: see map.md next to this template.
import type { MapModel } from "@open-pioneer/map";
import { expect, type Page } from "@playwright/test";
import type VectorLayer from "ol/layer/Vector";
import type VectorSource from "ol/source/Vector";

/**
 * Map model query helpers for Playwright E2E tests of Open Pioneer Trails applications.
 *
 * The OpenLayers map renders into a `<canvas>`, so its state (active base layer, layer
 * visibility, zoom, center, features, highlights) is not observable through the DOM.
 * The application exposes its Open Pioneer `MapModel` on `globalThis.__openPioneerMap`
 * when the dev server runs with `VITE_E2E_MAP_MODEL=true` (see map.md).
 *
 * Conventions:
 * - All helpers take the Playwright `page` first and return plain, serializable values.
 * - Layers are addressed by their stable `id`, never by their (translatable) title.
 * - `null` means "map, layer or value not available (yet)".
 * - Coordinates are in the map projection (see `getMapViewState().projection`), not lon/lat.
 * - Values are read once. After a UI action use `expect.poll(() => helper(page))` or
 *   `waitForMapSettled(page)` so the assertion retries until the state settles.
 * - Imports are type-only; no application or OPT runtime is loaded into the Playwright process.
 *   Each `page.evaluate` callback must be self-contained (it runs in the browser).
 */

type MapGlobal = typeof globalThis & { __openPioneerMap?: MapModel };

// ---------------------------------------------------------------------------
// View
// ---------------------------------------------------------------------------

/** Snapshot of the map view, or `null` if the map model is not exposed (yet). */
export function getMapViewState(page: Page) {
    return page.evaluate(() => {
        const map = (globalThis as MapGlobal).__openPioneerMap?.olMap;
        if (!map) return null;
        const view = map.getView();
        const size = map.getSize();
        return {
            projection: view.getProjection().getCode(),
            center: (view.getCenter() as [number, number] | undefined) ?? null,
            zoom: view.getZoom() ?? null,
            extent: size ? view.calculateExtent(size) : null,
            size: size ?? null,
            attached: Boolean(map.getTargetElement()?.isConnected),
            animating: view.getAnimating(),
            interacting: view.getInteracting()
        };
    });
}

/** Current zoom level, or `null`. Increases when zooming in. */
export async function getMapZoomLevel(page: Page) {
    return (await getMapViewState(page))?.zoom ?? null;
}

/** Current center `[x, y]` in the map projection, or `null`. */
export async function getMapCenter(page: Page) {
    return (await getMapViewState(page))?.center ?? null;
}

/** Waits until the map model is exposed and the map has a usable, attached viewport. */
export async function waitForMapReady(page: Page) {
    await expect
        .poll(
            async () => {
                const view = await getMapViewState(page);
                return Boolean(
                    view?.attached &&
                        view.size?.every((value) => value > 0) &&
                        view.center &&
                        view.zoom !== null
                );
            },
            { message: "Map model available (VITE_E2E_MAP_MODEL=true) with a usable viewport" }
        )
        .toBe(true);
}

/**
 * Waits until the view is neither animating nor being interacted with.
 * Call it after the expected change has been observed: an idle view can precede an async action.
 */
export async function waitForMapSettled(page: Page) {
    await waitForMapReady(page);
    await expect
        .poll(
            async () => {
                const view = await getMapViewState(page);
                return Boolean(view?.attached && !view.animating && !view.interacting);
            },
            { message: "Map view animation/interaction has finished" }
        )
        .toBe(true);
}

// ---------------------------------------------------------------------------
// Layers
// ---------------------------------------------------------------------------

/** `{ id, title }` of the active base layer, or `null` if none is active or the map is not ready. */
export function getActiveBaseLayer(page: Page) {
    return page.evaluate(() => {
        const layer = (globalThis as MapGlobal).__openPioneerMap?.layers.getActiveBaseLayer();
        return layer ? { id: layer.id, title: layer.title } : null;
    });
}

/**
 * State of a layer by id: `{ status: "present", visible, visibleInScale, loadState }`,
 * `{ status: "missing" }` if the map has no such layer, or `null` if the map is not ready.
 */
export function getMapLayerState(page: Page, layerId: string) {
    return page.evaluate((id) => {
        const map = (globalThis as MapGlobal).__openPioneerMap;
        if (!map) return null;
        const layer = map.layers.getLayerById(id);
        return layer
            ? {
                  status: "present" as const,
                  id,
                  visible: layer.visible,
                  visibleInScale: "visibleInScale" in layer ? layer.visibleInScale : null,
                  loadState: "loadState" in layer ? layer.loadState : null
              }
            : { status: "missing" as const, id };
    }, layerId);
}

/**
 * `true` if the layer exists and is switched visible.
 * Visibility only: whether the layer actually loaded must be checked via network responses.
 */
export async function isLayerVisible(page: Page, layerId: string) {
    const layer = await getMapLayerState(page, layerId);
    return layer?.status === "present" && layer.visible;
}

// ---------------------------------------------------------------------------
// Features and pointer positions
// ---------------------------------------------------------------------------

/**
 * Coordinate of the first point feature on a vector layer whose property `property` equals
 * `value`, or `null` if the map, layer or feature is not (yet) present.
 * Pair with {@link getMapPixelForCoordinate} for a real `page.mouse` click.
 */
export function getFeatureCoordinate(page: Page, layerId: string, property: string, value: unknown) {
    return page.evaluate(
        ({ layerId, property, value }) => {
            const layer = (globalThis as MapGlobal).__openPioneerMap?.layers.getLayerById(layerId);
            if (!layer || !("olLayer" in layer)) return null;
            const olLayer = layer.olLayer as VectorLayer<VectorSource>;
            const feature = olLayer
                .getSource()
                ?.getFeatures()
                .find((candidate) => candidate.get(property) === value);
            const geometry = feature?.getGeometry();
            return geometry && geometry.getType() === "Point"
                ? ((geometry as unknown as { getCoordinates(): [number, number] }).getCoordinates() ??
                      null)
                : null;
        },
        { layerId, property, value }
    );
}

/**
 * Converts a map-projection coordinate into browser client coordinates `[x, y]` for real mouse
 * actions, or `null`. Never click the map at hand-written pixel positions.
 */
export function getMapPixelForCoordinate(page: Page, coordinate: [number, number]) {
    return page.evaluate((point) => {
        const map = (globalThis as MapGlobal).__openPioneerMap?.olMap;
        if (!map) return null;
        const pixel = map.getPixelFromCoordinate(point);
        const bounds = map.getViewport().getBoundingClientRect();
        return pixel &&
            pixel[0] !== undefined &&
            pixel[1] !== undefined &&
            bounds.width &&
            bounds.height
            ? ([pixel[0] + bounds.left, pixel[1] + bounds.top] as [number, number])
            : null;
    }, coordinate);
}

/**
 * Coordinate of the first point highlight, or `null`.
 *
 * FRAGILE: relies on the OPT-internal class name `highlight-layer` of the highlight vector layer.
 * Prefer an application-specific, observable signal (e.g. a selected list entry) where possible,
 * and re-check this helper after OPT updates.
 */
export function getHighlightedCoordinate(page: Page) {
    return page.evaluate(() => {
        const map = (globalThis as MapGlobal).__openPioneerMap?.olMap;
        if (!map) return null;
        const highlightLayer = map
            .getLayers()
            .getArray()
            .find((layer) => layer.getClassName() === "highlight-layer") as
            | VectorLayer<VectorSource>
            | undefined;
        const geometry = highlightLayer?.getSource()?.getFeatures()[0]?.getGeometry();
        return geometry && geometry.getType() === "Point"
            ? ((geometry as unknown as { getCoordinates(): [number, number] }).getCoordinates() ??
                  null)
            : null;
    });
}
