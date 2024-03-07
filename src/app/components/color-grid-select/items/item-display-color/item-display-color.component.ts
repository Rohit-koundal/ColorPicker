import { Component, input } from '@angular/core';

@Component({
  selector: 'app-item-display-color',
  standalone: true,
  imports: [],
  templateUrl: './item-display-color.component.html',
  styleUrl: './item-display-color.component.scss'
})
export class ItemDisplayColorComponent {
   displayValue=input("");
}
