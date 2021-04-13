import { Component,
  OnInit,Renderer2,
  ViewEncapsulation,
  AfterViewInit} from '@angular/core';

import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import {UserDataService} from '../services/user.data.service';
import { AuthGuard } from "../../app/guards/auth-guard.service";

import {AppAuthComponent} from '../app.auth.component';
import { CarDataService } from "../services/car.data.service";
import {Location} from '@angular/common';

declare function addRemoveClass():any; //run in myJsFile.js

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation:ViewEncapsulation.None
})

export class AppComponent
  extends AppAuthComponent
  implements OnInit {

  title = 'vehiclesFront';

  constructor(
    public carService:CarDataService,
    public render2:Renderer2,
    public jwtHelper:JwtHelperService,
    public router:Router,
    public userData:UserDataService,
    public  authGuard:AuthGuard,
    public location:Location
    ){
      super(carService,userData,location,jwtHelper,authGuard,router)
  }



  ngOnInit(){
    console.clear();
    console.log("AppComponent ngOnInit");
  }

  onCheckBoxChange(){
    addRemoveClass();
  }


  logOut(){
    this.userName=null;

    this.isAuthenticated = false;
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
  }

  //todo: revoke token

}
