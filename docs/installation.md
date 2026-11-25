# Einrichtung im Anwendungsprojekt

## Voraussetzungen

- Eine lokal startbare Anwendung, nachvollziehbare fachliche Testfälle und ein bekanntes Testziel.
- Node.js und ein zum Projekt passender Paketmanager; Playwright Test als Projektabhängigkeit, Browser und Testkonfiguration gemäß [Playwright](https://playwright.dev/docs/intro).
- Ein unterstützter Client mit Zugriff auf das Projekt und den für die generierten Playwright-Agenten benötigten Tools. MCP-Verfügbarkeit und erlaubte Browserzugriffe nach Client-Konfiguration prüfen.
- Einen Checkout dieses Repositories auf einer bewusst gewählten Version oder einem Commit. Das Anwendungsprojekt dokumentiert diese Version; kopierte Skills aktualisieren sich nicht selbst.

## 1. Projektprofil anlegen

Kopiere `templates/project.md` nach `.ai-e2e/project.md` im Anwendungsrepository und fülle es aus. Das Profil legt pro Ziel URL, Start- und Testbefehl, Seed-Test sowie die Pfade für Testfälle, Specs und Berichte fest; optional kommen projektspezifische Hinweise dazu. Die [Standardpfade](paths.md) gelten, soweit das Profil keine Bestandsprojektpfade ausdrücklich abweichend registriert.

## 2. Gemeinsame Skills kopieren

Kopiere alle sieben vollständigen Verzeichnisse aus `skills/` in das Skill-Verzeichnis des gewählten Clients: die sechs Workflow-Skills mit ihren `template.md`-Berichtsvorlagen und `e2e-conventions`, die gemeinsamen Regeln für Specs. Die Skills verweisen relativ aufeinander (`../e2e-conventions/`) und müssen deshalb nebeneinander im selben Verzeichnis liegen.

| Client | Projektverzeichnis |
| --- | --- |
| VS Code mit Copilot | `.github/skills/` |
| Claude Code | `.claude/skills/` |
| OpenCode | `.opencode/skills/` |
| Codex | `.agents/skills/` |

Beispiel in PowerShell, ausgeführt im Root des **Anwendungsprojekts**; ersetze den Quellpfad durch deinen Checkout:

```powershell
$workflowSource = 'C:\pfad\zu\ai-e2e-workflow'
$skillDestination = '.github/skills' # für den gewünschten Client anpassen
New-Item -ItemType Directory -Force -Path $skillDestination | Out-Null
Get-ChildItem -Directory -Path (Join-Path $workflowSource 'skills') | ForEach-Object {
    Copy-Item -Recurse -LiteralPath $_.FullName -Destination $skillDestination
}
```

Vor dem Kopieren prüfen, ob gleichnamige Verzeichnisse bereits bestehen. Nicht blind überschreiben oder verschachteln. Soll ein Skill in mehreren Clients verfügbar sein, die passende Installation für jeden Client ausführen. Für OpenCode zusätzlich die sechs Dateien aus `adapters/opencode/commands/` nach `.opencode/commands/` kopieren; zuvor Namenskollisionen prüfen. Verwendete Workflow-Version (Tag oder Commit) im Anwendungsprojekt festhalten, z. B. in der Commit-Nachricht, und Änderungen im Zielprojekt prüfen und versionieren.

### Optional: Framework-Skill

Basiert die Anwendung auf einem Framework, für das `frameworks/` einen Skill enthält (z. B. `e2e-open-pioneer-trails` für Open Pioneer Trails), kopiere dieses Verzeichnis zusätzlich in dasselbe Skill-Verzeichnis. Trage es in `.ai-e2e/project.md` unter „Projekt-Skills“ ein, zusammen mit einem eventuellen App-Skill der Anwendung, z. B. `e2e-open-pioneer-trails, klimaportal-e2e`. Vorrang hat der App-Skill vor dem Framework-Skill vor `e2e-conventions`.

**Karten in OPT-Anwendungen:** Nutzt die Anwendung `@open-pioneer/map`, zusätzlich:

1. Die Vorlage `frameworks/e2e-open-pioneer-trails/map-model-helpers.ts` ins Anwendungsprojekt kopieren, z. B. nach `tests/e2e/support/map-model-helpers.ts`, und im Dateikopf die Workflow-Version eintragen.
2. In der Anwendung das Map-Model bei `VITE_E2E_MAP_MODEL=true` auf `globalThis.__openPioneerMap` bereitstellen und den Dev-Server in `playwright.config.ts` mit dieser Variable starten. Beispielcode steht in `frameworks/e2e-open-pioneer-trails/map.md`.
3. Den Helper-Pfad in `.ai-e2e/project.md` unter „Hinweise“ eintragen.

Projektspezifische Kartenhelfer kommen in eine eigene Datei daneben, z. B. `tests/e2e/support/<app>-map.ts`. Bei einem Update der Vorlage den Diff zur Projektkopie prüfen statt blind zu überschreiben.

## 3. Playwright-Agenten einrichten

Im Root des Anwendungsprojekts mit dessen installierter Playwright-Version ausführen, jeweils nur für die benötigten Clients:

```powershell
npx playwright init-agents --loop=vscode
npx playwright init-agents --loop=claude
npx playwright init-agents --loop=opencode
npx playwright init-agents --loop=codex
```

Die Befehle erzeugen clientabhängige Definitionen und ggf. Konfiguration. **Bei bestehenden Agenten zuerst die vorhandenen Dateien sichern bzw. deren Git-Stand prüfen**, Generierung in einem separaten Test-Checkout ausprobieren und den Diff vergleichen. Eigene Änderungen nicht ungeprüft überschreiben. Playwright empfiehlt die erneute Generierung bei Updates; Versionen und lokale Anpassungen danach erneut prüfen. Siehe [Playwright Test Agents](https://playwright.dev/docs/test-agents).

Die benötigten MCP-Tools gemäß den erzeugten Client-Dateien konfigurieren und freigeben. Einrichtung und verfügbare Werkzeuge hängen von Client und Playwright-Version ab. Seed-Test und Testkonfiguration aus dem Zielprojekt verwenden.

## 4. Funktion prüfen

Neue Session im Zielprojekt öffnen. Prüfe, ob der Client alle sieben Skills (plus ggf. den Framework-Skill) bzw. die sechs OpenCode-Befehle findet, die drei Playwright-Agenten verfügbar sind und die erforderlichen Browser-Tools funktionieren. Führe eine kleine, ungefährliche Reifeprüfung und eine Verifikation mit einem bekannten Testfall durch. Kontrolle: Profil wird gelesen, Bericht landet am vorgesehenen Ort, Browserbeobachtung ist tatsächlich möglich, Verifier ändert keinen Test und ein nicht freigegebener Testdefekt geht nicht an den Healer. Teste explizit, ob der Client die Playwright-Agenten auf Anforderung wirklich startet. Fehlende Funktionen als Einrichtungsproblem dokumentieren.

Siehe [Client-Anleitungen](clients.md) und [Pflege](maintenance.md).
