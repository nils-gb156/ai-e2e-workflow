# Auftrag: Healing

Neue Session öffnen und den von Playwright erzeugten Healer auswählen oder ausdrücklich beauftragen. Wenn der Client die folgenden Grenzen nicht zuverlässig anwenden kann, nicht automatisch fortfahren.

```text
Behebe ausschließlich die im Verifikationsbericht ausdrücklich freigegebenen Testdefekte für <Anwendung und Batch-ID>.
Projektprofil und Projekt-Skills: <Pfade>
Verifikationsbericht: <Pfad>
Reifebericht, Testplan und betroffene Testfälle: <Pfade>
Testartefakte: <Pfade>

Reproduziere je Fehlergruppe gezielt, ändere ausschließlich die im Bericht freigegebenen Testdateien und prüfe die Korrektur. Ändere keinen Produktcode, keine Anforderungen und keine Pläne. Verwende kein skip, fixme oder only und schwäche keine Assertions zum Grünwerden ab. Keine Daten- oder Fixture-Regeln des Projektprofils umgehen. Ist die Ursache unklar oder keine sichere Korrektur möglich, stoppe und gib den Befund an den Verifier zurück. Berichte Ursache, Änderungen, Testresultate und nächsten Schritt.
```

Nach dem Healing einen neuen Testlauf und eine unabhängige Verifikation durchführen.
