import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { JwtHelperService } from "@auth0/angular-jwt";
import {UserDataService}from '../services/user.data.service'
import {AuthGuard} from '../guards/auth-guard.service';
import { JwtModule,JwtModuleOptions } from "@auth0/angular-jwt";
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';
  import { HttpClient,
    HttpResponse,
    HttpErrorResponse } from '@angular/common/http';
import {JWT_MODULE_OPTIONS} from '../app.module';
import { AppRoutingModule } from '../app-routing.module';

describe('AppComponent', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        AppRoutingModule,
        JwtModule.forRoot(JWT_MODULE_OPTIONS)
      ],
      declarations: [AppComponent],
      providers:[
        JwtHelperService,
        UserDataService,
        AuthGuard,
        HttpClient

      ]
    }).compileComponents();

  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
