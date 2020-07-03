import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmProductsComponent } from './farm-products.component';

describe('FarmProductsComponent', () => {
  let component: FarmProductsComponent;
  let fixture: ComponentFixture<FarmProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
