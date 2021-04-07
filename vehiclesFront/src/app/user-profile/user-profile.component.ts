import { Component, OnInit } from '@angular/core';
import{Location} from '@angular/common';
import {UserDataService  } from "../services/user.data.service";
import{ActivatedRoute} from '@angular/router';
import {Response} from '../models/response';
import {Possessor } from "../models/possessor";
import { Car } from "../models/car";
import { JwtHelperService } from "@auth0/angular-jwt";

import * as jsonVehiclePath from '../../assets/data/vehiclePath.json'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public posessor:Possessor;
  public id:string;
  public vehicles:Car[];
  public userEmail:string;

  constructor(
    private userService:UserDataService,
    private location:Location,
    private route:ActivatedRoute,
    private jwtHelper:JwtHelperService,
  ) { }

  ngOnInit(): void {
    this.id =this.route.snapshot.paramMap.get('id');
    this.getUser();
    this.getUserEmail();
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
        this.vehicles?.forEach(v=>
        {
          v.imagePath = jsonVehiclePath.data
            .find(img=>img.uniqueNumber==v.uniqueNumber)?.path;
        });
        // console.log(this.vehicles);

      });
  }


  goBack():void{
    this.location.back();
  }


}