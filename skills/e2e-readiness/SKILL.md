---
name: e2e-readiness
description: Assess functional acceptance criteria for readiness for a scoped Playwright E2E batch before planning. Produce a readiness report without changing application code or tests.
---

# E2E-Reifeprüfung

Lies `.ai-e2e/project.md`, löse Ziel und optionales `batch=<name>` anhand des Aufrufs auf und lade einschlägige Projekt-Skills und fachliche Kriterien. Bei mehreren Zielen ohne eindeutigen Default frage nach. Ohne Batchangabe gilt `current`. Standardziel für den Bericht ist `test-plans/e2e/<ziel>/<batch>/readiness.md`; ein ausdrücklich registrierter Projektpfad hat Vorrang. Erfasse den Git-Stand, relevante uncommittete Änderungen und Voraussetzungen.

Verwende die verfügbaren, für das Projekt konfigurierten Playwright-MCP-Browserwerkzeuge zur Beobachtung der laufenden Anwendung. Ein Skill installiert oder aktiviert keine MCP-Tools: fehlen sie, ausdrücklich melden und die Prüfung nur als vorläufig kennzeichnen; keine vollständige Freigabe behaupten. Prüfe je Kriterium anhand des tatsächlichen Projekts, der laufenden Anwendung und bei Bedarf der Daten- und Serviceverträge, ob es mit einem nachvollziehbaren Testorakel reproduzierbar geprüft werden kann. Beobachtetes Verhalten und fachliche Erwartung unterscheiden; Abweichungen belegen und fachlich klären lassen. Erfinde keine Routen, Daten, Berechtigungen oder Selektoren.

Klassifiziere je Kriterium als bereit, teilweise bereit, blockiert durch Produkt, blockiert durch Daten/Umgebung, anderes Testniveau oder ungeklärt. Bei Überlappung eine Teamentscheidung empfehlen. Halte die ausdrücklich für Planung freigegebenen Kriterien und die offene Abdeckung getrennt fest. Beschreibe Nachweis, Datenbedarf, Voraussetzungen und nächsten Schritt.

Schreibe ausschließlich den Reifebericht und halte dich an die Struktur aus `template.md` in diesem Skill-Verzeichnis. Ändere keine Produktdateien, Tests oder fachlichen Anforderungen. Antworte mit Status, Berichtspfad, Grenzen und, bei Freigabe, `/e2e-plan` mit denselben Argumenten als nächstem Schritt.
