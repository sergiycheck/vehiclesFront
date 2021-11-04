
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { HttpClient,
  HttpResponse,
  HttpErrorResponse } from '@angular/common/http';
import { AuthGuard } from "./auth-guard.service";

import { JwtHelperService } from '@auth0/angular-jwt';
import { CanActivate, Router } from '@angular/router';

import { JwtModule,JwtModuleOptions } from "@auth0/angular-jwt";
import {JWT_MODULE_OPTIONS} from '../app.module';
import { AppRoutingModule } from '../app-routing.module';

describe('auth guard service ', () => {
  let guardService: AuthGuard;
  let httpClient:HttpClient;
  let httpTestingController: HttpTestingController;
  let jwtHelperService: JwtHelperService;
  let router:Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      //import the HttpClient mocking services
      imports:[
        HttpClientTestingModule,
        AppRoutingModule,
        JwtModule.forRoot(JWT_MODULE_OPTIONS)
      ],
      //provide the service-under-test
      providers: [
        AuthGuard]
    });

    //Inject the http, test controller, service
    //they will be referenced by each test
    httpClient = TestBed.inject(HttpClient);
    jwtHelperService = TestBed.inject(JwtHelperService);
    router = TestBed.inject(Router);

    httpTestingController = TestBed.inject(HttpTestingController);
    guardService = TestBed.inject(AuthGuard);

  });

  afterEach(()=>{
    //assert that there are no more pending requests
    httpTestingController.verify();
  })

  it('guardService should be created', () => {
    expect(guardService).toBeTruthy();
  });

})
