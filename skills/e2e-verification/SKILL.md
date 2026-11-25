---
name: e2e-verification
description: Independently verify a scoped Playwright E2E run against approved criteria and classify failures before healing. Write a report without modifying tests or product code.
---

# E2E-Verifikation

Lies `.ai-e2e/project.md`, löse Ziel und optionales `batch=<name>` auf und frage bei mehrdeutiger Zielauswahl nach. Ohne Batchangabe gilt `current`. Lade die im Profil genannten Projekt-Skills, fachliche Kriterien, Reifebericht, Testplan, `run.md` und die zugehörigen Specs. Lade außerdem `../e2e-conventions/SKILL.md`; die Projekt-Skills haben Vorrang. Prüfe die Specs auch gegen diese Regeln. Standardbericht: `test-plans/e2e/<ziel>/<batch>/verification.md`, sofern das Profil keinen anderen Pfad registriert. Ordne Testbefehl, Batch, Git-Stand, relevante lokale Änderungen und Laufartefakte nachvollziehbar dem geprüften Lauf zu. Fehlt dieser Nachweis, benenne die Lücke; interpretiere alte Artefakte nicht als aktuelle Ergebnisse.

Prüfe für jeden geplanten Test, ob Assertions und Orakel die freigegebenen Kriterien tatsächlich belegen. Grün allein ist keine fachliche Bestätigung; Teilabdeckung bleibt Teilabdeckung. Untersuche fehlgeschlagene Tests anhand vorhandener Traces, Screenshots, Konsolen- und Netzwerkdaten; bei Bedarf gezielt reproduzieren. Eine Timeout-Meldung allein ist keine Ursachenanalyse.

Klassifiziere als bestätigt, nicht ausreichend geprüft, bestätigter Testdefekt, Daten/Umgebung, Produktabweichung, Reifeprüfung/Plan korrigieren oder ungeklärt. Nur einen belegten Testdefekt ausdrücklich für den Healer freigeben; gib Ursache, Belege, betroffene Tests und zulässige Dateien an. Produktabweichungen und ungeklärte Befunde nicht durch Healing verdecken.

Schreibe ausschließlich den Verifikationsbericht und halte dich an die Struktur aus `template.md` in diesem Skill-Verzeichnis. Ändere keine Tests, Produktdateien oder fachlichen Erwartungen. Antworte mit Status, Berichtspfad, offenen Grenzen und dem konkreten nächsten Schritt, bei freigegebenem Testdefekt `/e2e-heal` mit denselben Argumenten.
