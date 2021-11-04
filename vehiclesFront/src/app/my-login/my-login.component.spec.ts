import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from '../app-routing.module';
import { JWT_MODULE_OPTIONS } from '../app.module';
import { AuthGuard } from '../guards/auth-guard.service';
import { UserDataService } from '../services/user.data.service';

import { MyLoginComponent } from './my-login.component';


// public jwtHelper: JwtHelperService,
// public userData:UserDataService,
// public  authGuard:AuthGuard,
// private authService: AuthorizationService

describe('MyLoginComponent', () => {

  let component: MyLoginComponent;
  let fixture: ComponentFixture<MyLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLoginComponent ],
      imports:[
        HttpClientTestingModule,
        FormsModule,
        AppRoutingModule,
        JwtModule.forRoot(JWT_MODULE_OPTIONS)
      ],
      providers:[
        JwtHelperService,
        UserDataService,
        AuthGuard,
        HttpClient

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create MyLoginComponent', () => {
    expect(component).toBeTruthy();
  });


});
