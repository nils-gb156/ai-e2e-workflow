---
name: e2e-plan
description: Request the Playwright planner to create an E2E plan for a ready batch using the project's E2E profile.
---

# E2E-Planung

Lies `.ai-e2e/project.md` und löse Ziel und optionalen `batch=<name>` anhand des Aufrufs auf. Bei fehlender eindeutiger Zielauswahl frage nach. Nutze die Profilpfade und das Schema `test-plans/e2e/<ziel>/<batch>/plan.md`. Prüfe den aktuellen Reifebericht und lade den Projekt-Skill und die freigegebenen fachlichen Kriterien.

Beauftrage den installierten Playwright Planner mit Browserzugriff; stelle ihm Profil, Projekt-Skill, freigegebene Kriterien, Zielpfad und die Planstruktur aus `template.md` in diesem Skill-Verzeichnis zur Verfügung. Nur freigegebene Kriterien planen, inklusive Orakel, Daten, Abdeckung, Spec-Zuordnung und offener Punkte. Kann der Client den benötigten Agenten oder Browser nicht bereitstellen, halte an und nenne die konkrete Einrichtungslücke; behaupte keine erfolgreiche Exploration. Ändere keine Produktdateien oder Tests. Abschluss mit Status, Berichtspfad und nächstem Befehl `/e2e-generate` mit denselben Argumenten.
