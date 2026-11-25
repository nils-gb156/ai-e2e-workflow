# Karten in OPT-Anwendungen testen

Nur relevant, wenn die Anwendung `@open-pioneer/map` verwendet. Ergänzt den Skill `e2e-open-pioneer-trails`; ein Projekt-Skill hat Vorrang.

## Warum ein Map-Model-Zugriff nötig ist

Die OpenLayers-Karte zeichnet in ein `<canvas>`. Aktiver Hintergrund, sichtbare Layer, Zoom, Kartenmitte, Features und Highlights sind deshalb nicht im DOM sichtbar. Für diese Zustände greifen Tests über `page.evaluate` auf das Open-Pioneer-`MapModel` zu. Alles, was im DOM sichtbar ist (Legenden, Layerlisten, Popups, Dialoge), wird weiterhin über Locator geprüft.

## Voraussetzung in der Anwendung

Die Anwendung stellt das `MapModel` nur im Testbetrieb auf `globalThis.__openPioneerMap` bereit. Das ist eine Änderung am Produktcode und wird vom Team umgesetzt, nicht von den Workflow-Skills. Fehlt sie, meldet die Reifeprüfung das als Blocker.

Beispiel in der Komponente, die das Map-Model kennt:

```ts
import type { MapModel } from "@open-pioneer/map";
import { useEffect } from "react";

useEffect(() => {
    if (import.meta.env.VITE_E2E_MAP_MODEL !== "true" || !map) return;
    const target = globalThis as { __openPioneerMap?: MapModel };
    target.__openPioneerMap = map;
    return () => {
        if (target.__openPioneerMap === map) delete target.__openPioneerMap;
    };
}, [map]);
```

Den Dev-Server für Playwright mit der Variable starten, z. B. in `playwright.config.ts`:

```ts
webServer: {
    command: "pnpm dev",
    env: { VITE_E2E_MAP_MODEL: "true" }
}
```

## Helper

- Die gemeinsamen Helper stehen in `map-model-helpers.ts` neben dieser Datei. Sie werden einmal ins Projekt kopiert, z. B. nach `tests/e2e/support/map-model-helpers.ts`. Der Pfad steht in `.ai-e2e/project.md` unter „Hinweise“.
- Specs importieren die Helper aus dem Projektpfad. Keine eigenen `page.evaluate`-Aufrufe auf das Map-Model in Specs schreiben, wenn ein Helper existiert.
- Projektspezifische Helper (bestimmte Layer-IDs, Feature-Eigenschaften, Quellen-Parameter) in eine eigene Datei daneben legen, z. B. `tests/e2e/support/<app>-map.ts`, und dort auf den gemeinsamen Helpern aufbauen. Die gemeinsame Datei nicht projektspezifisch erweitern.
- Fehlt ein Helper, im Plan oder Bericht als Bedarf festhalten. Allgemein nützliche Helper an das Workflow-Repository zurückmelden.

## Regeln

- Zu Beginn jedes Kartentests `waitForMapReady(page)` aufrufen.
- Nach einer UI-Aktion zuerst die erwartete Änderung mit `expect.poll(() => helper(page))` abwarten, danach bei Bedarf `waitForMapSettled(page)`. Ein ruhender View allein beweist nicht, dass die Aktion abgeschlossen ist.
- Layer immer über ihre `id` ansprechen, nie über den Titel.
- `visible` heißt nur „eingeschaltet“. Ob ein Layer wirklich geladen wurde, über die passende Network-Response prüfen (`page.waitForResponse`).
- Nie auf feste Pixelpositionen klicken. Koordinate über `getFeatureCoordinate` ermitteln, mit `getMapPixelForCoordinate` umrechnen und dann `page.mouse.click(x, y)` verwenden.
- Koordinaten liegen in der Kartenprojektion, nicht in Längen-/Breitengrad. Vergleiche mit Toleranz (`toBeCloseTo`) statt auf exakte Gleichheit.
- `getHighlightedCoordinate` hängt an einem OPT-internen Klassennamen. Wenn möglich ein beobachtbares Signal in der UI bevorzugen.
- Die Helper nutzen die API von `@open-pioneer/map`. Nach OPT-Updates prüfen, ob sie noch funktionieren.
