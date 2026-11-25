# Clients und Aufruf

Für jeden Schritt eine neue Session im Anwendungsprojekt starten. Das schafft frischen Gesprächskontext; die Markdown-Dateien bleiben die Übergabe. Ein Skill-Aufruf allein startet nicht automatisch eine neue Session. Eine Subagent-Session ist ebenfalls nicht dasselbe wie ein neuer Chat.

| Client | Reifeprüfung und Verifikation | Playwright-Schritte |
| --- | --- | --- |
| VS Code / Copilot | Alle installierten Skills können im `/`-Menü erscheinen | Skill fordert den generierten Agenten an; tatsächliche Delegation und MCP-Tools prüfen |
| Claude Code | Installierte Skills mit `/e2e-readiness`, `/e2e-plan` usw. aufrufen | Skill fordert den generierten Agenten an; tatsächliche Delegation und MCP-Tools prüfen |
| OpenCode | Die mitgelieferten Command-Dateien bieten `/e2e-readiness`, `/e2e-plan` usw. | Command fordert Skill und dieser den generierten Agenten an; tatsächliche Delegation prüfen |
| Codex | Skills mit `$e2e-readiness`, `$e2e-plan` usw. ausdrücklich aufrufen | Skill fordert den Agenten an, soweit die Client-Umgebung Delegation unterstützt |

Ein Skill kann die verfügbaren Playwright-MCP-Werkzeuge des ausführenden Agenten nutzen, installiert oder aktiviert sie aber nicht. Für Reifeprüfung ist ein aktivierter, erreichbarer Playwright-MCP und die Browserberechtigung erforderlich; andernfalls nur Vorprüfung. Ein zuvor ausgewählter Agent ist nicht zwingend, falls der aktive Agent die Tools bereits besitzt. Sind sie nur dem bisherigen Readiness-Agenten zugewiesen, muss dieser ausgewählt oder die Konfiguration des aktiven Agenten angepasst werden.

Die genauen Auswahlmöglichkeiten hängen von Version und Konfiguration ab. OpenCode-Commands werden separat installiert; sie weisen den aktiven Agenten an, den Skill zu laden, wählen aber keinen festen Agenten. Skills verlangen Planner, Generator oder Healer ausdrücklich, garantieren deren Start jedoch nicht. Falls die Delegation nicht funktioniert, den passenden Agenten manuell wählen und den Auftrag aus `prompts/` verwenden; Toolzugriff und Projektkontext prüfen. Für Codex wird ein Slash-Aufruf hier nicht behauptet. Keine automatische Agentenverkettung voraussetzen.

Zusätzlich zu den generierten Definitionen immer das Projektprofil, die relevanten Projekt-Skills und den passenden Auftrag aus `prompts/` angeben. Prüfen, dass der aktive Agent den Auftrag tatsächlich erhält; das bloße Vorhandensein einer Datei garantiert deren Anwendung nicht.

Quellen: [VS Code Skills](https://code.visualstudio.com/docs/agent-customization/agent-skills), [Claude Code Skills](https://code.claude.com/docs/en/skills), [OpenCode Skills](https://opencode.ai/docs/skills/), [OpenCode Commands](https://opencode.ai/docs/commands/), [Playwright Test Agents](https://playwright.dev/docs/test-agents).
