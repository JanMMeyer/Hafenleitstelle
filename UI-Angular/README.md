# UIAnuglar

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.17.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Lessons Learned oder Was ich mit 5 zusätzlichen Stunden machen würde.

- Tests! (so wenig hilfreich die template tests in angular auch manchmal scheinen, genau diesen bug hätten sie wahrscheinlich exponiert)
- Code Kommentare / JSDocs
- Richter Error Popup service statt nur "alert()"
- Include call stack oder endpoint info in Http error in error Logging Service.
- Bessere Modularisierung der Widgets, so dass die buttons nicht absolut positioniert werden müssen
- Overlapp der App buttons mit widgets vermeiden.
- Falls dann noch zeit ist: Es ist manchmal nicht ersichtlich warum man ein widget nicht plaziern kann, das liegt daran, dass "kein platz" mehr auf dem canvas ist. (Wegen Requirement "Fullschreen app auf Monitor im Situation room": Um Scrollbars zu vermeiden, hat der Canvas eine feste größe.)
  Entweder: immer platzierung ermoglichen Durch Dynamische größe der widgets/canvas bei platzierung abhängig von der screen size. Das kann aber sogar das die Demo vom framework selbst nicht...
  Oder: Bessere graphische Rückmeldung, die überlapp anzeigt. Nutzer versteht dann, dass andere widgets weggeschoben oder verkleinert werden müssen.

### Was ich bei bei einer echten App anders gemacht hätte

- Die App ist voller Kommentar die bei der letzten Präsentation als Ankerpunkt für mündliche Erläuterungen dienten oder um klar zu machen, dass an der Code noch nicht production ready ist und was dazu noch fehlt. Zum selben Zweck hatte die Bewusst für diese Präsentation auch drin gelassen. Bis zum ersten pull request müssten die natürlich rausgenommen werden. Anregung: Fragen die man mit dem Reviewer erörtern möchte drin lassen?
- Die commits sind größenteil "end of day" commits (Teilweise ist dies dem Wechsel des Rechners geschuldet), die nicht sauber (oder garnicht) nach code units segmentiert sind. Frage: Wie geht man mit der Situation von incomplete /broken code am ende des Arbeitsages um? Ich tagge meist mit "wip: featurebeschreibung"
- Entsprechend durchwachsen sind die commit messages. Hier habe ich schlicht Energie gespart die ich lieber in den Code selbst gesteckt habe. Das war eine Priorisierung für die Demo, da ich dachte am besten eine solide architektur präsentieren zu sollen.
- Daten Fakes entfernen. Diese dienten nur der veanschaulichung, wenn z.B. keine winddaten zur verfügung standen.
