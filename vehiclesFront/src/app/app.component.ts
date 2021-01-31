import { Component, OnInit,Renderer2 } from '@angular/core';
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

declare function addRemoveClass():any;//run in myJsFile.js

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

    ){

  }
  ngOnInit(): void {
  }


  onCheckBoxChange(){
    addRemoveClass();
  }

  isUserAuthenticated():boolean{
    const token:string = localStorage.getItem("jwt");
    return token && !this.jwtHelper.isTokenExpired(token)?true:false;
  }


  logOut(){
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
  }

  //todo revoke token

}
