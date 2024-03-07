import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorGridSelectComponent } from './color-grid-select.component';

describe('ColorGridSelectComponent', () => {
  let component: ColorGridSelectComponent;
  let fixture: ComponentFixture<ColorGridSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorGridSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorGridSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle input changes', () => {
    const colors = ['color1', 'color2', 'color3'];
    component.colors = colors;
    fixture.detectChanges();

    expect(component.colors).toEqual(colors);
  });

  it('should select color on click', () => {
    const color = 'selectedColor';
    spyOn(component, 'selectColor');
    component.colors = [color];
    fixture.detectChanges();

    const colorElement = fixture.debugElement.nativeElement.querySelector('.color');
    colorElement.click();

    expect(component.selectColor).toHaveBeenCalledWith(color);
  });

  it('should handle arrow key navigation', () => {
    spyOn(component, 'navigate');
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    document.dispatchEvent(event);

    expect(component.navigate).toHaveBeenCalledWith('ArrowUp');
  });

  it('should update grid on window resize', () => {
    spyOn(component, 'calculateGrid');
    const event = new Event('resize');
    window.dispatchEvent(event);

    expect(component.calculateGrid).toHaveBeenCalled();
  });
});