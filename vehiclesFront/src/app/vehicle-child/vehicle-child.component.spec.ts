import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, async }
  from '@angular/core/testing';
import { Car } from '../models/car';
import { CarDataService } from '../services/car.data.service';


import { VehicleChildComponent } from './vehicle-child.component';

describe('VehicleChildComponent', () => {
  let component: VehicleChildComponent;
  let fixture: ComponentFixture<VehicleChildComponent>;

  let carDataServiceSpy: jasmine.SpyObj<CarDataService>;
  let httpClient:HttpClient;

  beforeEach(async(() => {
    const spyDataService = jasmine.createSpyObj('CarDataService', ['canUserAccess']);


    const testingModule = TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
      ],
      declarations: [ VehicleChildComponent ],
      providers:[
        {provide:CarDataService,useValue:spyDataService}
      ]
    })

    httpClient = TestBed.inject(HttpClient);
    carDataServiceSpy = TestBed.inject(CarDataService) as jasmine.SpyObj<CarDataService>;
    testingModule.compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleChildComponent);
    component = fixture.componentInstance;
    let date = new Date(Date.now());
    const car = {
      id:1,
      uniqueNumber:"vevev0-12112",
      brand:"honda",
      color:"red",
      price: 12333,
      carEngine:1.3,
      description:"test descriptions",
      transmision:"front",
      drive:"full",
      _date:date.toISOString(),
      date: date,

      [Symbol.iterator]: function* () {
        let properties = Object.keys(this);
        for (let i of properties) {
          yield [i, this[i]];
        }
      }
    }


    component.vehicle = new Car(car.id,car.uniqueNumber,car.brand,car.color,car.price,car.carEngine,car.description,car.transmision,car.drive,false,"false");

    component.canUserAccess = ()=>{};

    component.isUserAllowedForAction = true;

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
