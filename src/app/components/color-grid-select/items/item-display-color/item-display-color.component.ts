import { Component, input } from '@angular/core';

@Component({
  selector: 'app-item-display-color',
  standalone: true,
  imports: [],
  templateUrl: './item-display-color.component.html',
  styleUrl: './item-display-color.component.sass'
})
export class ItemDisplayColorComponent {
   displayValue=input("");
}
