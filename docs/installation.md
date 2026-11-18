# Einrichtung im Anwendungsprojekt

## Voraussetzungen

- Eine lokal startbare Anwendung, nachvollziehbare fachliche Testfälle und ein bekanntes Testziel.
- Node.js und ein zum Projekt passender Paketmanager; Playwright Test als Projektabhängigkeit, Browser und Testkonfiguration gemäß [Playwright](https://playwright.dev/docs/intro).
- Ein unterstützter Client mit Zugriff auf das Projekt und den für die generierten Playwright-Agenten benötigten Tools. MCP-Verfügbarkeit und erlaubte Browserzugriffe nach Client-Konfiguration prüfen.
- Einen Checkout dieses Repositories auf einer bewusst gewählten Version oder einem Commit. Das Anwendungsprojekt dokumentiert diese Version; kopierte Skills aktualisieren sich nicht selbst.

## 1. Projektprofil anlegen

Kopiere `templates/project-profile.md` nach `.ai-e2e/project.md` im Anwendungsrepository und fülle es aus. Das Profil definiert Ziele, Befehle, Datenpolitik und projektspezifische Regeln. Die [Standardpfade](paths.md) gelten, soweit das Profil keine Bestandsprojektpfade ausdrücklich abweichend registriert.

## 2. Gemeinsame Skills kopieren

Kopiere alle sechs vollständigen Verzeichnisse aus `skills/` in das Skill-Verzeichnis des gewählten Clients:

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

Vor dem Kopieren prüfen, ob gleichnamige Verzeichnisse bereits bestehen. Nicht blind überschreiben oder verschachteln. Soll ein Skill in mehreren Clients verfügbar sein, die passende Installation für jeden Client ausführen. Für OpenCode zusätzlich die sechs Dateien aus `adapters/opencode/commands/` nach `.opencode/commands/` kopieren; zuvor Namenskollisionen prüfen. Versionsstand im Projektprofil festhalten und Änderungen im Zielprojekt prüfen und versionieren.

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

Neue Session im Zielprojekt öffnen. Prüfe, ob der Client alle sechs Skills bzw. OpenCode-Befehle findet, die drei Playwright-Agenten verfügbar sind und die erforderlichen Browser-Tools funktionieren. Führe eine kleine, ungefährliche Reifeprüfung und eine Verifikation mit einem bekannten Testfall durch. Kontrolle: Profil wird gelesen, Bericht landet am vorgesehenen Ort, Browserbeobachtung ist tatsächlich möglich, Verifier ändert keinen Test und ein nicht freigegebener Testdefekt geht nicht an den Healer. Teste explizit, ob der Client die Playwright-Agenten auf Anforderung wirklich startet. Fehlende Funktionen als Einrichtungsproblem dokumentieren.

Siehe [Client-Anleitungen](clients.md) und [Pflege](maintenance.md).
