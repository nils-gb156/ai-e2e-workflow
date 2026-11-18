---
name: e2e-heal
description: Request the Playwright healer to repair only test defects explicitly released in an E2E verification report.
---

# E2E-Healing

Lies `.ai-e2e/project.md`, bestimme Ziel und optionalen Batch und lade Projekt-Skill, aktuellen Plan und Verifikationsbericht. Bei mehrdeutiger Auswahl nachfragen. Nur explizit freigegebene und belegte Testdefekte an den installierten Playwright Healer übergeben, mit zulässigen Dateien und Projektregeln. Fehlen Agent, Browserwerkzeuge, aktuelle Freigabe oder notwendige Nachweise, stoppe.

Keine Produktdateien, Anforderungen oder Pläne ändern; kein `skip`, `fixme` oder `only`, Assertions nicht zum Grünwerden abschwächen und Datenregeln nicht umgehen. Kann der Healer diese Grenzen nicht einhalten, Arbeit abbrechen und an den Verifier zurückgeben. Resultate und Prüfungen dokumentieren; anschließend `/e2e-run` mit denselben Argumenten empfehlen.
