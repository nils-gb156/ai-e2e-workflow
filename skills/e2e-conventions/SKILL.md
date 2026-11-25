---
name: e2e-conventions
description: Shared rules for writing, reviewing and repairing Playwright E2E specs in this workflow. Loaded by the e2e-plan, e2e-generate, e2e-verification and e2e-heal skills; framework and project skills listed in the project profile take precedence.
---

# E2E-Konventionen

Gemeinsame Regeln für Playwright-Specs im E2E-Workflow. Vorrang hat immer die spezifischere Ebene: Projekt-Skill vor Framework-Skill vor diesen Konventionen. Welche Skills gelten, steht unter „Projekt-Skills“ in `.ai-e2e/project.md`.

## Locator

- Bevorzuge nutzernahe, stabile Locator in dieser Reihenfolge: `getByRole` → `getByLabel` → `getByText` → `getByTestId`, wenn eine echte, stabile Test-ID existiert.
- Eine Test-ID ist kein HTML-`id`; selektiere sie nur mit `getByTestId`.
- Kein XPath, keine generierten Klassennamen oder IDs und keine Selektoren über die DOM-Struktur.
- Bei mehrfach vorkommenden Labels auf einen fachlichen Container scopen (Landmark, Dialog, Navigation, Formular). `exact` nur verwenden, wenn es genau die gewünschte Unterscheidung ausdrückt.

## Testgestaltung

- Eine Spec-Datei pro fachlichem Testfall; mehrere unabhängige Tests darin sind erlaubt.
- Jeder Test bildet ein unabhängiges Szenario ab. `page.goto()` ist für Setup und Deep-Link-Prüfungen erwünscht; Navigation über die UI nur, wenn sie Gegenstand des Szenarios ist.
- Web-first Assertions wie `await expect(locator).toBeVisible()`. Keine festen Wartezeiten, kein `waitForTimeout` und kein `networkidle`.
- Bei echten asynchronen Abläufen gezielt auf Response, Popup oder Download warten. Für Zustände außerhalb des DOM `expect.poll()` verwenden.
- Nur fachlich relevante Ergebnisse prüfen. Externe Ziele über `href`, `target` oder einen kontrollierten Popup-Kontext prüfen; keine Drittseiten automatisieren.

## Daten und Testorakel

- Tests brauchen kontrollierbare Daten. Externe Dienste nicht als alleinige Testgrundlage verwenden, sofern das Projektprofil oder ein Projekt-Skill nichts anderes festlegt. Fixtures und `page.route()` nur, wenn das Projekt sie zulässt; ein Verbot im Projekt hat Vorrang.
- Erfinde keine Routen, Labels, Testdaten, APIs oder Berechtigungen. Fehlende Testdaten als Bedarf im Plan oder Bericht festhalten.
- Erzeuge keinen Test, der absichtlich gegen den aktuellen Produktstand scheitert. Abweichungen zwischen fachlichem Testfall und Anwendung dokumentieren und fachlich klären lassen.

## Fehleranalyse

- Bei einem fehlgeschlagenen Test zuerst Trace, Screenshot, Video sowie Konsolen- und Netzwerkdaten auswerten, bevor Locator oder Timing geändert werden.
- Kein `skip`, `fixme` oder `only`, um einen Lauf grün zu bekommen; Assertions nicht abschwächen.
