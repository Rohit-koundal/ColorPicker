// ColorGridSelectComponent.stories.ts

import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ColorGridSelectComponent } from './color-grid-select.component';
import { ItemDisplayColorComponent } from './items/item-display-color/item-display-color.component';

export default {
  title: 'Color Grid Select',
  decorators: [
    moduleMetadata({
      declarations: [ColorGridSelectComponent, ItemDisplayColorComponent],
      imports: [CommonModule],
    }),
  ],
};

export const Default = () => ({
  component: ColorGridSelectComponent,
  props: {
    colors: [
      "rgba(245 ,158, 11 ,1)",
      "rgba(250 ,204 ,21, 1)",
      "rgba(132, 204, 22, 1)",
      // Add more colors as needed
    ],
  },
});