---
name: e2e-open-pioneer-trails
description: Framework-specific Playwright E2E rules for Open Pioneer Trails (OPT) applications, such as shadow DOM, Chakra UI, SPDX headers and map model helpers for @open-pioneer/map. Use together with e2e-conventions and an application-specific E2E skill.
---

# E2E für Open Pioneer Trails

Ergänzt `e2e-conventions` um Regeln für Anwendungen auf Open Pioneer Trails (OPT). Ein Projekt-Skill der getesteten Anwendung hat Vorrang.

## Shadow DOM

- OPT-Anwendungen werden häufig als Custom Element mit offener Shadow Root ausgeliefert. Rollen-, Label- und Text-Locators von Playwright durchdringen diese Grenze.
- `document.querySelector()` in `page.evaluate()` durchdringt die Shadow Root nicht; nicht verwenden.

## Styling

- Keine Klassennamen von Chakra UI oder Emotion in Locators; sie werden generiert und sind instabil.

## Spec-Dateien

- Jede Spec enthält den SPDX-Header gemäß `eslint.config.mjs` des Projekts.
- `test` und `expect` aus `@playwright/test` importieren.

## Karten

Verwendet die Anwendung `@open-pioneer/map`, lies zusätzlich `map.md` in diesem Skill-Verzeichnis. Dort stehen die Voraussetzung in der Anwendung (`VITE_E2E_MAP_MODEL`), die gemeinsamen Map-Model-Helper (`map-model-helpers.ts`) und die Regeln für Kartentests.

Layer-IDs, Feature-Eigenschaften, WMS-/ArcGIS-Parameter und darauf aufbauende Helper sind anwendungsspezifisch und gehören in den Projekt-Skill der jeweiligen Anwendung.
