# E2E-Projektprofil: <Projekt/Anwendung>

Dieses Profil ist projektspezifisch. Ersetze Platzhalter und speichere es unter `.ai-e2e/project.md` im Anwendungsrepository. Keine Zugangsdaten eintragen. Die standardisierten Pfade stehen in `docs/paths.md` des Workflow-Repositories.

## Versionen und Verantwortliche

- Workflow-Version/Commit: <Version>
- Playwright-Version: <Version aus Projekt-Lockfile>
- Eingesetzte Clients und Versionen: <Clients>
- Pflegekontakt/Team: <Team>

## Projekt und Umgebung

- Anwendung und Zweck: <Beschreibung>
- Projektroot: <Pfad>
- Startbefehl und lokale URL: <Befehl und URL ohne Geheimnisse>
- Playwright-Konfiguration und Seed-Test: <Pfade>
- Testlauf-Befehl und gezielter Einzeltest: <Befehle>
- Browser-/MCP-Voraussetzungen: <Beschreibung>
- Daten, Dienste, Zugriffe und bekannte Grenzen: <Beschreibung>
- Fixtures, Mocks und echte Dienste: <Projektregel und zulässige Ausnahmen>
- Fachliches Soll und Vorgehen bei Produktabweichungen: <Quelle/Entscheidung>

## Pfade und Zuordnung

- Ziele und optionales Default-Ziel: <z. B. default; oder portal, monitor ohne Default>
- Für jedes Ziel: <Name, URL, Startbefehl, Testlauf-Befehl, Projekt-Skill, fachliche Testfälle, Specs und Helper>
- Standard fachliche Testfälle: `tests/e2e/cases/<ziel>/`
- Standard Specs: `tests/e2e/specs/<ziel>/`
- Standard Übergaben: `test-plans/e2e/<ziel>/<batch>/readiness.md`, `plan.md`, `run.md`, `verification.md`
- Abweichende Bestandsprojektpfade je Ziel und je Batch: <explizite Zuordnung oder keine>
- Testartefakte: <Pfade und Nachweis ihrer Laufzuordnung>
- Zuordnung Testfall zu Spec: <Projektregel>
- Parallel laufende Batches: <getrennte Batchnamen und Pfade>

## Projektspezifische Regeln

- <Fachliche Besonderheiten, Testorakel, erlaubte Änderungen, Datenschutz>
- <Voraussetzungen und notwendige Nachweise>
- <Abgrenzung zu Produkt-, Daten- und Testdefekten>

## Client-Einrichtung

- Installierte Skills und Agenten: <Versionen und Orte>
- Browser-Tools / MCP: <Name und Konfiguration ohne Geheimnisse>
- Bekannte Einschränkungen: <Beschreibung>
- Zuletzt geprüft: <Datum, Client und Ergebnis>
