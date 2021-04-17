import {
  Component,
   OnInit,
   OnDestroy } from '@angular/core';

import{Location} from '@angular/common';
import {UserDataService  } from "../services/user.data.service";
import{ActivatedRoute} from '@angular/router';
import {Response} from '../models/response';
import {Possessor } from "../models/possessor";
import { Car } from "../models/car";
import { JwtHelperService } from "@auth0/angular-jwt";

import { CarDataService } from "../services/car.data.service";

import { Penalty } from "../models/penalty";

import { Subscription } from 'rxjs';
import {AuthorizationService} from '../services/authorization.service';

declare function showLoginModal():any;


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent
  implements OnInit,
  OnDestroy {

  public posessor:Possessor;
  public id:string;

  public vehicles:Car[];
  public penalties:Penalty[];

  public userEmail:string;

  public showPenaltyComponent:boolean=false;

  public currentPenalty:Penalty;


  public isAuthenticated:boolean=false;

  constructor(
    public userService:UserDataService,
    public carService:CarDataService,

    private location:Location,
    private route:ActivatedRoute,
    private jwtHelper:JwtHelperService,
    private authService: AuthorizationService
  ) {


   }

   private subscribeToauthService(){
      this.authService.canActivateWithoutLogin().then(resp=>{
        this.isAuthenticated = resp;

        if(this.isAuthenticated){
          this.getUserPenalties();
        }

      })


   }

  handleShowPenaltyComponent(selectedPenalty){


    this.currentPenalty = selectedPenalty;
    this.showPenaltyComponent=true;
  }

  handleHidePenaltyComponent(){

    this.currentPenalty = null;
    this.showPenaltyComponent=false;
  }

  ngOnInit(): void {
    console.log('ngOnInit user profile');

    this.subscribeToauthService();


    this.id =this.route.snapshot.paramMap.get('id');

    this.getUser();
    this.getUserEmail();
  }

  public getToken():string{
    return localStorage.getItem("jwt");
  }

  getUser(){
    this.userService.getUserById(this.id)
    .subscribe((response:Response)=>{
      this.posessor = response.data;
      // console.log('posessor', this.posessor);
    })
  }


  getUserEmail(){
    const token:string = localStorage.getItem("jwt");
    if(token && !this.jwtHelper.isTokenExpired(token)){
      if(!this.userEmail){

        this.userService.getUserName(token)
        .subscribe((response)=>{
          this.userEmail = response;
        });
      }
    }
  }

  getUserCars():void{
    if(!this.posessor){
      return;
    }

    this.userService.getVehiclesByOwner(this.posessor)
    .subscribe(
      (response:Response)=>{
        this.vehicles=response.data

        this.vehicles.forEach(vehicle=>{
          vehicle.imageData = `data:${vehicle.imgFile.contentType};base64,${vehicle.imgFile.fileContents}`
        });
      });
  }

  getUserPenalties():void{
    if(!this.posessor){
      return;
    }
    this.authService.canActivate().then( resp=>{
      this.isAuthenticated = resp;

      if(this.isAuthenticated){

        this.userService.getUserPenalties(this.posessor.id)
        .subscribe((response:Response)=>{
          if(response){
            this.penalties = response.data;

          }else{
            console.log('undefined response');
          }
        })

      }
    })




  }




  goBack():void{
    this.location.back();
  }

  ngOnDestroy(){
    console.log('user profile ngOnDestroy');
    //this.subscription.unsubscribe();
  }


}
