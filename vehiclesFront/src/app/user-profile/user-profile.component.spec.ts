import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from '../app-routing.module';
import { JWT_MODULE_OPTIONS } from '../app.module';
import { AuthorizationService } from '../services/authorization.service';
import { CarDataService } from '../services/car.data.service';
import { UserDataService } from '../services/user.data.service';
import { ActivatedRouteStub } from '../testing/activated-route-stub';

import { UserProfileComponent } from './user-profile.component';

// public userService:UserDataService,
// public carService:CarDataService,
// private location:Location,
// private route:ActivatedRoute,
// private authService: AuthorizationService


describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let activatedRoute: ActivatedRouteStub;
  const userId = {id: "0c834546-39a2-4da9-8ba9-fe8e7caa5367"}

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub(userId);
  });

  beforeEach(() => activatedRoute.setParamMap(userId));

  beforeEach(async(() => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute',[''])

    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        AppRoutingModule,
        JwtModule.forRoot(JWT_MODULE_OPTIONS)
      ],
      declarations: [ UserProfileComponent ],
      providers:[
        UserDataService,
        CarDataService,
        {provide:ActivatedRoute, useValue:activatedRoute},
        AuthorizationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
