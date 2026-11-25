# Ablauf

Jeder Lauf braucht ein Projektprofil und einen klar abgegrenzten Batch fachlicher Testfälle. Falls das Projekt Anforderungen nicht als einzelne Testfälle verwaltet, nutze identifizierbare Kriterien aus einer anderen verbindlichen Quelle. Die Projektkonvention bestimmt, ob ein Testfall einer oder mehreren Specs zugeordnet wird.

| Schritt | Befehl | Liest | Schreibt |
| --- | --- | --- | --- |
| Reifeprüfung | `/e2e-readiness` | Profil, Testfälle, Anwendung | Reifebericht |
| Planung | `/e2e-plan` → Playwright Planner | Profil, Reifebericht | Testplan |
| Generierung | `/e2e-generate` → Playwright Generator | Profil, Plan, Testfälle | Specs |
| Ausführung | `/e2e-run` | Profil, Specs | `run.md`, Laufartefakte |
| Verifikation | `/e2e-verification` | Profil, Plan, Specs, Lauf | Verifikationsbericht |
| Healing | `/e2e-heal` → Playwright Healer | Verifier-Freigabe | freigegebene Testdateien |

Vor jeder Phase eine neue Session starten und den Befehl, optional mit Ziel und `batch=<name>`, ausführen. Das Profil und die [Standardpfade](paths.md) liefern die Übergaben. Erst nach aktueller Reifeprüfung planen; nur explizit prüfbare Kriterien einplanen und generieren. Nach Healing Tests erneut ausführen und unabhängig verifizieren. Eine Vorprüfung ohne erforderlichen Browser- oder Dienstzugriff ist keine vollständige Freigabe.

## Entscheidungen

- **Produktabweichung oder fehlende Anforderung:** belegen und zur fachlichen Entscheidung zurückgeben. Das beobachtete Verhalten ist nicht automatisch das fachliche Soll.
- **Umgebung, Daten oder externe Dienste:** Voraussetzung und betroffene Kriterien dokumentieren; kein automatisches Healing.
- **Unklare Ursache:** gezielt untersuchen oder offenlassen. Nicht als Testdefekt ausgeben.
- **Bestätigter Testdefekt:** Verifier nennt Ursache, Belege und zulässige Dateien; nur dann Healer beauftragen.
- **Teilabdeckung:** bestätigte und offene Kriterien getrennt ausweisen; grüne Tests nicht als vollständige Abdeckung interpretieren.

Der Healer darf keine Produktdateien, fachlichen Erwartungen, Reife- oder Testpläne ändern, keine Tests überspringen und Assertions nicht zum Grünwerden abschwächen. Wenn die Aufgabe nicht sicher erfüllbar ist, stoppen und an Verifier bzw. Team zurückgeben. Abweichende Daten- oder Fixture-Regeln werden im Projektprofil festgelegt.

## Übergabe und Abschluss

Jeder Bericht nennt Batch, Zeit und Git-Stand, relevante uncommittete Änderungen, Eingaben, Belege, offenen Umfang und nächste Aktion. Ohne reproduzierbare Zuordnung eines Laufartefakts zu Befehl, Batch und Zeitpunkt keinen aktuellen Lauf behaupten; insbesondere kann `.last-run.json` allein nicht alle Nachweise liefern. Parallele Batches benötigen getrennte Dateien oder Verzeichnisse. Abschlussantwort: Status, geänderte Dateien, Prüfungen, Blocker und ein konkreter nächster Schritt; wenn abgeschlossen, ausdrücklich „kein weiterer Schritt nötig“.
