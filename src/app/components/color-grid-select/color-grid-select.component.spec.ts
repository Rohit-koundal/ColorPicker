import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorGridSelectComponent } from './color-grid-select.component';

describe('ColorGridSelectComponent', () => {
  let component: ColorGridSelectComponent;
  let fixture: ComponentFixture<ColorGridSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorGridSelectComponent],
    });
    fixture = TestBed.createComponent(ColorGridSelectComponent);
    component = fixture.componentInstance;
    component.colors = [
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
      ,"rgba(236, 72 ,153, 1)"
      ,"rgba(236, 72 ,159, 1)"
      ,"rgba(236, 72 ,155, 1)"
      ,"rgba(236, 72 ,154, 1)"
      ,"rgba(236, 72 ,151, 1)"
      ,"rgba(236, 72 ,159, 1)"
      ,"rgba(225 ,29 ,72, 1)"
      ];
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle color selection', () => {
    spyOn(component, 'onChange');
    spyOn(component, 'onTouch');

    component.selectColor('rgba(245 ,158, 11 ,1)');

    expect(component.selectedColor).toBe('rgba(245 ,158, 11 ,1)');
    expect(component.onChange).toHaveBeenCalledWith('rgba(245 ,158, 11 ,1)');
    expect(component.onTouch).toHaveBeenCalled();
  });

  it('should handle value changes', () => {
    component.writeValue('rgba(245 ,158, 11 ,1)');
    expect(component.selectedColor).toBe('rgba(245 ,158, 11 ,1)');
  });

  it('should disable the component', () => {
    component.setDisabledState(true);
    expect(component.isDisabled).toBe(true);
  });

  it('should calculate the grid layout', () => {
    component.calculateGrid();
    // Add expectations based on your grid layout calculation
    // For example, you can check if grid-template-columns and grid-template-rows are set correctly.
  });

  it('should handle keyboard navigation', () => {
    spyOn(component, 'navigate');
    spyOn(component, 'setFocus');

    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    component.handleKeyboardEvent(event);

    expect(component.navigate).toHaveBeenCalledWith(-10);
    // Add expectations for setFocus and other relevant checks
  });
});