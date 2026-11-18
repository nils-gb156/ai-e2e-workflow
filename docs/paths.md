# Standardpfade und Zielauswahl

Dieses Schema gilt ab Installation im **Anwendungsrepository**. Es sind standardisierte Defaults; vorhandene Projekte können während einer schrittweisen Migration im Profil explizit andere Pfade festlegen. Keine vorhandenen Tests oder Berichte automatisch verschieben oder überschreiben.

```text
<projekt>/
  .ai-e2e/
    project.md                        # Projektprofil, einschließlich Zielauswahl
  tests/e2e/
    cases/<ziel>/                     # fachliche Testfälle (Markdown)
    specs/<ziel>/                     # ausführbare Playwright-Tests
  test-plans/e2e/<ziel>/<batch>/
    readiness.md                      # Reifeprüfung
    plan.md                           # Planung
    run.md                            # Befehl und Zuordnung der Laufartefakte
    verification.md                   # Verifikation und Healing-Freigabe
```

`<ziel>` und `<batch>` sind kurze, eindeutige Verzeichnisnamen aus Kleinbuchstaben, Ziffern und Bindestrich. Default bei einem einzigen Ziel ist `default`; ohne Batchangabe ist der Batch `current`. Mehrere Ziele werden im Projektprofil explizit aufgeführt. Wird ein Ziel angegeben, muss es dort definiert sein. Ist keines angegeben und existiert genau ein Ziel, nutze es; bei mehreren Zielen ohne Default frage nach. Ein zusätzlicher Ordner ist bei einem Projekt mit einem Ziel nicht als Befehlsargument nötig. Für parallele Läufe unterschiedliche Batchnamen verwenden, z. B. `klimamonitor batch=suche`; bestehende Berichte nicht ungefragt überschreiben, wenn sie zu einem anderen laufenden Batch gehören.

Beispiele: `/e2e-readiness`, `/e2e-plan klimamonitor`, `/e2e-verification klimamonitor batch=suche`. Aufrufe funktionieren nur nach clientabhängiger Installation; siehe [clients.md](clients.md). Testartefakte verbleiben an den in der Playwright-Konfiguration festgelegten Orten und müssen eindeutig einem Lauf zugeordnet werden.

Das Projektprofil registriert pro Ziel Startbefehl, URL, Pfade und Projekt-Skill. Der Testplan und die Berichte sind die persistente Übergabe. Vorgängerberichte auf Batch, Kriterien, Git-Stand und wesentliche Änderungen prüfen; veraltete Freigaben nicht übernehmen. Der Name `current` ist kein Aktualitätsnachweis.
