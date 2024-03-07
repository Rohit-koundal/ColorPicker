import { CommonModule } from '@angular/common';
import {
  Component, forwardRef, Input, OnInit, Renderer2, ElementRef, QueryList,
  ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { FocusKeyManager, FocusableOption } from '@angular/cdk/a11y';
import { ColorPickerModule } from 'ngx-color-picker';
import { Subject } from 'rxjs';
import { ItemDisplayColorComponent } from './items/item-display-color/item-display-color.component';

@Component({
  selector: 'app-color-grid-select',
  standalone: true,
  imports: [CommonModule, ColorPickerModule, FormsModule,ItemDisplayColorComponent],
  templateUrl: './color-grid-select.component.html',
  styleUrl: './color-grid-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorGridSelectComponent),
      multi: true,
    },
  ],
})
export class ColorGridSelectComponent implements OnInit, ControlValueAccessor  {
  @Input() colors: any = [
    "rgba(245 ,158, 11 ,1)"
    , "rgba(250 ,204 ,21, 1)"
    , "rgba(132, 204, 22, 1)"
    , "rgba(34, 197, 94,1)"
    , "rgba(52, 211, 153, 1)"
    , "rgba(94, 234 ,212, 1)"
    , "rgba(34, 211 ,238, 1)"
    , "rgba(14, 165, 233, 1)"
    , "rgba(37, 99 ,235, 1)"
    , "rgba(79, 70 ,229, 1)"
    , "rgba(124, 58 ,237, 1)"
    , "rgba(147 ,51, 234, 1)"
    , "rgba(192 ,38, 211, 1)"
    , "rgba(266, 52 ,153, 1)"
    , "rgba(236, 73 ,159, 1)"
    , "rgba(136, 52 ,155, 1)"
    , "rgba(136, 345 ,154, 1)"
    , "rgba(26, 72 ,151, 1)"
    , "rgba(289, 72 ,159, 1)"
    , "rgba(225 ,29 ,72, 1)"];

  color: string = "rgb(242,27,27)";
  index: number = 0;
  selectedColor: string = "rgba(245 ,158, 11 ,1)";
  editColor: boolean = false;
  isDisabled: boolean = false;
  toggle: boolean = false;
  gridColumns: number = 5;
  outputValue:string=this.selectedColor;
  private onChange: (color: string) => void = () => { };
  private onTouch: () => void = () => { };
  private keyManager: FocusKeyManager<ElementRef>;
  private destroyed$ = new Subject<void>();
  @ViewChildren('colorElementArray') colorElements: QueryList<FocusableOption & ElementRef<any>>;

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit() {
    if (this.colors.length > 0) {
      this.selectedColor = this.colors[0];
    }
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }
  ngAfterViewInit(){
    this.calculateGrid(true);
    const focusableElements = this.colorElements.toArray();
    this.keyManager = new FocusKeyManager(focusableElements).withWrap();
    this.keyManager.change.subscribe(index => {
      this.selectColor(this.colors[index]);
      this.setFocus(index);
    });
  }
  
  onKeyPress(event: KeyboardEvent): void {
    if (!this.isDisabled) {
      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
          this.navigate(event.key);
          break;
      }
    }
  }
  
  private navigate(direction: string): void {
    const currentIndex = this.colors.indexOf(this.selectedColor);
    let newIndex: number;
    switch (direction) {
      case 'ArrowUp':
        newIndex = (currentIndex - this.gridColumns + this.colors.length) % this.colors.length;
        break;
      case 'ArrowDown':
        newIndex = (currentIndex + this.gridColumns) % this.colors.length;
        break;
      case 'ArrowLeft':
        newIndex = (currentIndex - 1 + this.colors.length) % this.colors.length;
        break;
      case 'ArrowRight':
        newIndex = (currentIndex + 1) % this.colors.length;
        break;
      default:
        newIndex = currentIndex;
        break;
    }
    this.selectColor(this.colors[newIndex]);
    this.setFocus(newIndex);
  }

  private setFocus(index: number): void {
    this.keyManager.setActiveItem(index);
    this.colorElements.toArray()[index].nativeElement.focus();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  selectColor(color: string) {
    if (!this.isDisabled) {
      this.selectedColor = color;
      this.onChange(this.selectedColor);
      this.onTouch();
    }
    this.outputValue = color;
  }

  writeValue(color: string): void {
    this.selectedColor = color;
  }

  registerOnChange(fn: (color: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  private onWindowResize() {
    this.calculateGrid();
  }

  calculateGrid(initial?:any) {
    const gridElement = this.el.nativeElement.querySelector('.color-grid');
    const gridWidth = gridElement.offsetWidth;
    const columnWidth = gridWidth / this.gridColumns;
    const rowHeight = columnWidth;
    initial?this.renderer.setStyle(gridElement, 'grid-template-columns', `repeat(${5}, ${54}px)`):this.renderer.setStyle(gridElement, 'grid-template-columns', `repeat(${this.gridColumns}, ${columnWidth}px)`);
    initial?this.renderer.setStyle(gridElement, 'grid-template-rows', `repeat(${5}, ${54}px)`):this.renderer.setStyle(gridElement, 'grid-template-rows', `repeat(${Math.ceil(this.colors.length / this.gridColumns)}, ${rowHeight}px)`);
  }

  calculateRow(index: number): number {
    return Math.floor(index / this.gridColumns) + 1;
  }
}
