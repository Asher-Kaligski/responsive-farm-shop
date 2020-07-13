import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmOrdersComponent } from './farm-orders.component';

describe('FarmOrdersComponent', () => {
  let component: FarmOrdersComponent;
  let fixture: ComponentFixture<FarmOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
