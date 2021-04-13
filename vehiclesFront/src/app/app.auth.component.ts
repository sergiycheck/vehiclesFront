import { Component,
  OnInit,
  AfterViewInit} from '@angular/core';

  import { JwtHelperService } from "@auth0/angular-jwt";
  import {UserDataService} from './services/user.data.service';
  import { AuthGuard } from "./../app/guards/auth-guard.service";
  import { CarDataService } from "./services/car.data.service";
  import{Location} from '@angular/common';
  import { Router } from "@angular/router";

@Component({
  selector: 'app-auth-root',
  template:`<div>base auth component</div>`
})
export class AppAuthComponent implements AfterViewInit {

  public isAuthenticated:boolean=false;
  public userName:string;

  constructor(
    public carService:CarDataService,
    public userData:UserDataService,
    public location:Location,
    public jwtHelper:JwtHelperService,
    public authGuard:AuthGuard,
    public router:Router

  ){
  }


  ngAfterViewInit(){
    console.log(' AppAuthComponent ngAfterViewInit');

    setTimeout(async () => {
      await this.isUserAuthenticated();
      this.router.navigate(['/vehicles']);
    });

  }


  public getToken():string{
    return localStorage.getItem("jwt");
  }


  public async isUserAuthenticated(){

    const token=this.getToken();

    if(token && !this.jwtHelper.isTokenExpired(token)){
      console.log('AppAuthComponent token is not expired');

      this.isAuthenticated = true;
      console.log('AppAuthComponent this.isAuthenticated',this.isAuthenticated.valueOf());

      if(!this.userName){
        console.log('user name is empty');
        await this.getUserName();
      }

    }else if(token && this.jwtHelper.isTokenExpired(token)){
      console.log(' AppAuthComponent token is expired refreshing');
      const activateResult = await this.authGuard.canActivate();

      if(activateResult){
        this.isAuthenticated = activateResult;
        console.log('AppAuthComponent activateResult',activateResult.valueOf());
        await this.getUserName();
      }

    }

  }

  public async getUserName(){
    const token = this.getToken();
    if(token){
      this.userName = await this.userData.getUserName(token).toPromise();
      console.log('getUserName this.userName',this.userName.valueOf())
    }

  }


}
