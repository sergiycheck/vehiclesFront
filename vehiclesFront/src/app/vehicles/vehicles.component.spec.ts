import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule, routes } from '../app-routing.module';
import { JWT_MODULE_OPTIONS } from '../app.module';
import { AuthGuard } from '../guards/auth-guard.service';
import { CarDataService } from '../services/car.data.service';
import { UserDataService } from '../services/user.data.service';

import { VehiclesComponent } from './vehicles.component';

describe('VehiclesComponent', () => {
  let component: VehiclesComponent;
  let fixture: ComponentFixture<VehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        JwtModule.forRoot(JWT_MODULE_OPTIONS)
      ],
      declarations: [ VehiclesComponent ],
      providers:[
        UserDataService,
        CarDataService,
        JwtHelperService,
        AuthGuard
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
