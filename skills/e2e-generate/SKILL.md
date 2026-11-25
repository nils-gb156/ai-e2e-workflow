---
name: e2e-generate
description: Request the Playwright generator to implement approved E2E tests for a planned batch.
---

# E2E-Generierung

Lies `.ai-e2e/project.md`, bestimme Ziel und `batch=<name>`, lade die im Profil genannten Projekt-Skills, aktuellen Reifebericht und Plan. Lade außerdem `../e2e-conventions/SKILL.md`; die Projekt-Skills haben Vorrang. Bei mehrdeutiger Zielauswahl nachfragen. Beauftrage den installierten Playwright Generator mit den Eingaben, den Konventionen und dem Spec-Ziel aus dem Profil. Nur ausdrücklich freigegebene Kriterien umsetzen, Daten- und Spec-Regeln einhalten, keine Produktdateien oder fachlichen Anforderungen ändern. Fehlen Agent, Browserzugriff oder aktuelle Freigabe, stoppe und benenne die Lücke. Antworte mit Dateien, Prüfergebnissen und `/e2e-run` mit denselben Argumenten.
