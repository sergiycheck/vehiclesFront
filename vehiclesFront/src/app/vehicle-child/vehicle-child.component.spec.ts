import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleChildComponent } from './vehicle-child.component';

describe('VehicleChildComponent', () => {
  let component: VehicleChildComponent;
  let fixture: ComponentFixture<VehicleChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
