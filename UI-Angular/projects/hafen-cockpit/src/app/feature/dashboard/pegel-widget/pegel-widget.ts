import { Component } from '@angular/core';
import { WidgetContainer } from '@cockpit/shared/widget/cell/cell';

@Component({
  selector: 'app-pegel-widget',
  imports: [WidgetContainer],
  templateUrl: './pegel-widget.html',
  styleUrl: './pegel-widget.scss',
})
export class PegelWidget {}
