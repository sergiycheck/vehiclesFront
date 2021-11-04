import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CarDataService } from '../services/car.data.service';
import { UserDataService } from '../services/user.data.service';
import { ActivatedRoute, ActivatedRouteStub } from '../testing/activated-route-stub';

import { VehicleDetailsComponent } from './vehicle-details.component';

describe('VehicleDetailsComponent', () => {
  let component: VehicleDetailsComponent;
  let fixture: ComponentFixture<VehicleDetailsComponent>;
  let activatedRoute: ActivatedRouteStub;
  const carId = {id: "2"}

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub(carId);
  });

  beforeEach(() => activatedRoute.setParamMap(carId));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      declarations: [ VehicleDetailsComponent ],
      providers:[
        UserDataService,
        CarDataService,
        {provide:ActivatedRoute, useValue:activatedRoute},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
