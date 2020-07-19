import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmOrderDetailsComponent } from './farm-order-details.component';

describe('FarmOrderDetailsComponent', () => {
  let component: FarmOrderDetailsComponent;
  let fixture: ComponentFixture<FarmOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
