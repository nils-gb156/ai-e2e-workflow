---
name: e2e-run
description: Execute the configured scoped Playwright E2E batch and identify the run artifacts for verification.
---

# E2E-Testlauf

Lies `.ai-e2e/project.md`, bestimme Ziel und optionalen Batch; bei mehrdeutiger Zielauswahl nachfragen. Führe den im Profil angegebenen Testbefehl für den im aktuellen Plan festgelegten Batch aus. Dokumentiere Befehl, Zeitpunkt, Ergebnis, Git-Stand, relevante lokale Änderungen und diesem Lauf eindeutig zugeordnete Artefakte. Fehlen Voraussetzungen, berichte den Blocker. Ändere keine Tests oder Produktdateien. Empfiehl `/e2e-verification` mit denselben Argumenten und übergib die Laufdaten so, dass sie in der nächsten Session lesbar sind; lege sie im Batchordner als `run.md` ab.
