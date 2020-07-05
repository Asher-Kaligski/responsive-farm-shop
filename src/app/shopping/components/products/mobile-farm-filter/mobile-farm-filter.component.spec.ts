import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileFarmFilterComponent } from './mobile-farm-filter.component';

describe('MobileFarmFilterComponent', () => {
  let component: MobileFarmFilterComponent;
  let fixture: ComponentFixture<MobileFarmFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileFarmFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileFarmFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
