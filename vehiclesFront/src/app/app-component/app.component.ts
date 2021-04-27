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

import {AuthorizationService} from '../services/authorization.service';

import { Possessor } from "../models/possessor";


declare function addRemoveClass():any; //run in myJsFile.js

declare function showLoginModal():any;
declare function hideLoginModal():any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation:ViewEncapsulation.None,

  providers:[AuthorizationService]
})

export class AppComponent
  implements OnInit,AfterViewInit {

  title = 'vehiclesFront';
  public isAuthenticated:boolean=false;

  public user:Possessor;
  public userName:string;

  constructor(
    public carService:CarDataService,
    public render2:Renderer2,
    public jwtHelper:JwtHelperService,
    public router:Router,
    public userData:UserDataService,
    public  authGuard:AuthGuard,
    public location:Location,

    private authService: AuthorizationService
    ){

  }


  ngOnInit(){
    console.clear();
    console.log("AppComponent ngOnInit");


  }

  ngAfterViewInit(){
    console.log(' AppComponent ngAfterViewInit');

    setTimeout(async () => {
      await this.isUserAuthenticated();

      console.log('AppComponent this.isAuthenticated',this.isAuthenticated);
      console.log('AppComponent this.userName',this.userName);
      this.authService.setAuthentication(this.isAuthenticated);
      this.authService.setUserName(this.userName);
    });

  }


  handleClickLogin(){
    // this.showloginPanel = true;
    showLoginModal();

  }
  handleClickHideLogin(){
    // this.showloginPanel = false;
    hideLoginModal();
  }

  onCheckBoxChange(){
    addRemoveClass();
  }

  public getToken():string{
    return localStorage.getItem("jwt");
  }


  public async isUserAuthenticated(){

    const token=this.getToken();

    if(token && !this.jwtHelper.isTokenExpired(token)){
      console.log('AppComponent token is not expired');

      this.isAuthenticated = true;

      console.log('AppComponent this.isAuthenticated',this.isAuthenticated.valueOf());

      if(!this.userName){
        console.log('user name is empty');
        await this.getUserName();
      }

    }else if(token && this.jwtHelper.isTokenExpired(token)){
      console.log(' AppComponent token is expired refreshing');
      const activateResult = await this.authGuard.canActivate();

      if(activateResult){
        this.isAuthenticated = activateResult;

        console.log('AppComponent activateResult',activateResult.valueOf());
        await this.getUserName();
      }

    }

  }

  public async getUserName(){
    const token = this.getToken();

    if(token){
      this.userData.getUser(token).toPromise().then(response=>{
        if(response && response.data){
          console.log(response.data);
          this.user = response.data;
          this.userName = this.user.userName?this.user.userName:this.user.name;
        }

        if(this.userName && this.isAuthenticated){
          console.log('AppComponent getUserName this.userName',this.userName.valueOf())
          console.log('AppComponent this.isAuthenticated',this.isAuthenticated);
          this.authService.setAuthentication(this.isAuthenticated);
          this.authService.setUserName(this.userName);
        }

      })




    }

  }



  logOut(){
    this.userName=null;
    this.user = null;

    this.isAuthenticated = false;
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");

    this.authService.setAuthentication(this.isAuthenticated);
  }

  //todo: revoke token

}
