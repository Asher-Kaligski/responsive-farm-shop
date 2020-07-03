import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmFilterComponent } from './farm-filter.component';

describe('FarmFilterComponent', () => {
  let component: FarmFilterComponent;
  let fixture: ComponentFixture<FarmFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
