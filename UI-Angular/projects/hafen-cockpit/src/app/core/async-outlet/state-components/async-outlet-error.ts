import { Component } from '@angular/core';

@Component({
	selector: 'app-async-outlet-error',
	imports: [],
	template: ` <span>Es gibt ein Problem mit der Serververbindung, bitte warten sie ein paar minuten und nutzen die Refresh-Funktion des Widgets.</span> `,
	styles: ``,
})
export class AsyncOutletError {}
