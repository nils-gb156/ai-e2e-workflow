# AI E2E Workflow

Ein wiederverwendbarer, clientübergreifender Workflow für fachlich nachvollziehbare Playwright-E2E-Tests. Playwright liefert Planner, Generator und Healer; dieses Repository ergänzt Reifeprüfung, Verifikation, Übergaben und Schutzregeln.

## Einstieg

1. [Projekt einrichten und Skills installieren](docs/installation.md).
2. Das [Projektprofil](templates/project.md) im Anwendungsrepository ausfüllen.
3. Den [Ablauf und die Aufträge](docs/workflow.md) verwenden. Für jeden größeren Schritt eine neue Session starten.
4. Die [Standardpfade](docs/paths.md) und passende [Client-Anleitung](docs/clients.md) beachten.

## Ablauf

```text
Fachliche Testfälle → Reifeprüfung → Playwright Planner → Playwright Generator
  → Testlauf → Verifikation → ggf. Playwright Healer → Testlauf + Verifikation
```

Die Sessions tauschen sich über Dateien im Anwendungsprojekt aus. Ein grüner Test ist erst bestätigt, wenn seine Assertions das freigegebene Kriterium tatsächlich belegen. Der Healer erhält nur ausdrücklich freigegebene Testdefekte.

## Inhalt

| Pfad | Zweck |
| --- | --- |
| `docs/` | Einrichtung, Client-Besonderheiten, Ablauf und Pflege |
| `skills/` | Sechs Workflow-Skills inkl. Berichtsvorlagen (`template.md`) und die gemeinsamen Konventionen `e2e-conventions` |
| `frameworks/` | Optionale Framework-Skills, z. B. für Open Pioneer Trails inkl. Map-Model-Helper als Kopiervorlage |
| `adapters/opencode/` | Slash-Befehle für OpenCode |
| `templates/` | Kopiervorlage für das Projektprofil |
| `prompts/` | Kopierbare Aufträge für alle Schritte |

Playwright-Agenten werden mit der im Zielprojekt installierten Playwright-Version erzeugt; sie sind hier nicht vendort. Projektwissen, Testfälle, Reports, Tests und Zugangsdaten gehören ins jeweilige Projekt, nicht in dieses Repository. Die Vorlagen sind Empfehlungen; das Projektprofil legt die tatsächlich verwendeten Pfade fest.

## Stand und Grenzen

Dies ist eine initiale Fassung. Die Kombination aus Client-Version, Playwright-Version und MCP-Konfiguration muss im Zielprojekt praktisch geprüft werden. Skills und Prompts beschreiben Verhalten; sie erzwingen keine Schreibrechte. Eine neue Session wird zunächst manuell geöffnet. Ob der Client auf einen Skill-Aufruf hin den gewünschten Playwright-Agenten tatsächlich startet, muss geprüft werden.

Quellen: [Playwright Test Agents](https://playwright.dev/docs/test-agents), [Agent Skills in VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills), [Claude Code Skills](https://code.claude.com/docs/en/skills), [OpenCode Skills](https://opencode.ai/docs/skills/).
