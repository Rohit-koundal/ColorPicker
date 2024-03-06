import { CommonModule } from '@angular/common';
import { HostListener, SimpleChanges } from '@angular/core';
import { Component, forwardRef, Input, OnInit, Renderer2, ElementRef,QueryList,
  ViewChildren, } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { ColorPickerModule } from 'ngx-color-picker';
import { ColorPickerComponent } from 'ngx-color-picker';

@Component({
  selector: 'app-color-grid-select',
  standalone: true,
  imports: [CommonModule, ColorPickerModule,FormsModule],
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
export class ColorGridSelectComponent {
  @Input() colors: string[] = [
"rgba(245 ,158, 11 ,1)"
,"rgba(250 ,204 ,21, 1)"
,"rgba(132, 204, 22, 1)"
,"rgba(34, 197, 94,1)"
,"rgba(52, 211, 153, 1)"
,"rgba(94, 234 ,212, 1)"
,"rgba(34, 211 ,238, 1)"
,"rgba(14, 165, 233, 1)"
,"rgba(37, 99 ,235, 1)"
,"rgba(79, 70 ,229, 1)"
,"rgba(124, 58 ,237, 1)"
,"rgba(147 ,51, 234, 1)"
,"rgba(192 ,38, 211, 1)"
,"rgba(266, 52 ,153, 1)"
,"rgba(236, 73 ,159, 1)"
,"rgba(136, 52 ,155, 1)"
,"rgba(136, 345 ,154, 1)"
,"rgba(26, 72 ,151, 1)"
,"rgba(289, 72 ,159, 1)"
,"rgba(225 ,29 ,72, 1)"

];
color:string="rgb(242,27,27)";
index:number=0;
selectedColor: string="rgba(245 ,158, 11 ,1)";
EditColor:boolean =false;
  isDisabled: boolean = false;
  toggle:boolean=false;
  gridColumns: number = 10; // Number of columns in the grid, adjust as needed

  private onChange: (color: string) => void = () => {};
  private onTouch: () => void = () => {};
  private keyManager: FocusKeyManager<HTMLElement>;

  @ViewChildren('colorElement') colorElements: QueryList<any>;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    if (this.colors.length > 0) {
      this.selectedColor = this.colors[0];
    }
    this.calculateGrid();
  }

  selectColor(color: string) {
    if (!this.isDisabled) {
      this.selectedColor = color;
      this.onChange(this.selectedColor);
      this.onTouch();
    }
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

  @HostListener('document:keydown', ['$event'])
handleKeyboardEvent(event: KeyboardEvent) {
  if (!this.isDisabled) {
    if (this.keyManager) {
      this.keyManager.onKeydown(event);
    } else {
      this.handleNavigationFallback(event);
    }
  }
}

private handleNavigationFallback(event: KeyboardEvent) {
  let offset = 0;

  switch (event.key) {
    case 'ArrowUp':
      offset = -this.gridColumns;
      break;
    case 'ArrowDown':
      offset = this.gridColumns;
      break;
    case 'ArrowLeft':
      offset = -1;
      break;
    case 'ArrowRight':
      offset = 1;
      break;
  }

  this.navigate(offset);
}

private navigate(offset: number) {
  const currentIndex = this.colors.indexOf(this.selectedColor);
  const newIndex = (currentIndex + offset + this.colors.length) % this.colors.length;
  this.selectColor(this.colors[newIndex]);
  this.setFocus(newIndex);
}
  private setFocus(index: number) {
    if (this.colorElements) {
      this.colorElements.toArray()[index].nativeElement.focus();
    }
  }

   calculateGrid() {
    const gridElement = this.el.nativeElement.querySelector('.color-grid');
    const gridWidth = gridElement.offsetWidth;
    const columnWidth = gridWidth / this.gridColumns;
    const rowHeight = columnWidth; // Assuming square colors
    // console.log(Math.ceil(this.colors.length / this.gridColumns),rowHeight)

    this.renderer.setStyle(gridElement, 'grid-template-columns', `repeat(${this.gridColumns}, ${columnWidth}px)`);
    this.renderer.setStyle(gridElement, 'grid-template-rows', `repeat(${Math.ceil(this.colors.length / this.gridColumns)}, ${rowHeight}px)`);
  }
  changeColor(color:any,i?:any){
    if(this.EditColor === false){
      this.colors.push(color);
      this.EditColor = false;
    }
    else if(this.EditColor === true){
        this.colors[i]=color;
        this.EditColor = false;
    }
    
  }
  editColor(color:any,i:any){
    this.toggle = true;
    this.EditColor =true;
    this.index=i;
    // this.changeColor(color,i)
  }

  ngAfterViewInit() {
    // this.keyManager = new FocusKeyManager<HTMLElement>(this.colorElements).withWrap();
  }
  calculateRow(index: number): number {
    return Math.floor(index / this.gridColumns) + 1;
  }
}
