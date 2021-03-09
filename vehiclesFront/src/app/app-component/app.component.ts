import { Component, OnInit,Renderer2 } from '@angular/core';
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import {UserDataService} from '../services/user.data.service';
import { AuthGuard } from "../../app/guards/auth-guard.service";

declare function addRemoveClass():any; //run in myJsFile.js

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'vehiclesFront';

  constructor(
    render2:Renderer2,
    private jwtHelper:JwtHelperService,
    private router:Router,
    private userData:UserDataService,
    private authGuard:AuthGuard,

    ){
  }
  userName:string;

  ngOnInit(): void {
  }


  onCheckBoxChange(){
    addRemoveClass();
  }

  isUserAuthenticated():boolean{
    const token:string = localStorage.getItem("jwt");
    if(token && !this.jwtHelper.isTokenExpired(token)){
      if(!this.userName){
        this.getUserName(token);
      }
      return true;
    }else{
      if(this.jwtHelper.isTokenExpired(token)){
        // if(this.authGuard.canActivate()){
        //   this.userName = "";
        // }
        //console.log(`token expired ${token}`);
      }

    }
    return false;
  }

  getUserName(token:string):void{
    this.userData.getUserName(token)
    .subscribe((response)=>{
      this.userName = response;
    })
  }

  logOut(){
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
  }

  //todo revoke token

}
