import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDisplayColorComponent } from './item-display-color.component';

describe('ItemDisplayColorComponent', () => {
  let component: ItemDisplayColorComponent;
  let fixture: ComponentFixture<ItemDisplayColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDisplayColorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemDisplayColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
