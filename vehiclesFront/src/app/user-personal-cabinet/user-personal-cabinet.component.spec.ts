import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from '../app-routing.module';
import { JWT_MODULE_OPTIONS } from '../app.module';
import { AuthorizationService } from '../services/authorization.service';
import { UserDataService } from '../services/user.data.service';

import { UserPersonalCabinetComponent } from './user-personal-cabinet.component';


// private authService: AuthorizationService,
// private userService:UserDataService,
// private router:Router,


describe('UserPersonalCabinetComponent', () => {
  let component: UserPersonalCabinetComponent;
  let fixture: ComponentFixture<UserPersonalCabinetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        AppRoutingModule,
        JwtModule.forRoot(JWT_MODULE_OPTIONS)
      ],
      declarations: [ UserPersonalCabinetComponent ],
      providers:[
        HttpClient,
        AuthorizationService,
        UserDataService,
        JwtHelperService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPersonalCabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
