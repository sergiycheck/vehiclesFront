import { Component, OnInit,Input } from '@angular/core';
import { CarDataService } from "../services/car.data.service";
import { Car } from "../models/car";
import{Location} from '@angular/common';
import {Response} from '../models/response';
import { AuthGuard } from "../guards/auth-guard.service";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

import * as jsonVehiclePath from '../../assets/data/vehiclePath.json'

declare function dateValidator():any;

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

public vehicles:Car[];
vehicle: Car = new Car();
showUpdatePane:boolean=false;

viewTypes:any[]=
  [
    {
      id:'option1',
      viewTypeValue:'grid-view',
      class:'btn btn-transparent m-2 grid-view-btn',
    },
    {
      id:'option2',
      viewTypeValue:'list-view',
      class:'btn btn-transparent m-2 list-view-btn'
    }
  ];
currentViewType:string='grid-view';

public userCanAccess:boolean=false;

  constructor(
    private carService:CarDataService,
    private location:Location,
    private router:Router,
    private jwtHelper:JwtHelperService,
    private authGuard:AuthGuard,
  ) { }

  async ngOnInit() {
    this.getCars();
    const token:string = localStorage.getItem("jwt");
    if(token!==null){
      await this.tryActivateToken();
    }
    this.isUserAuthenticated();//called only from html chunk. watches changes in sessionStorage
  }

  isUserAuthenticated(){
    const token:string = localStorage.getItem("jwt");
    if(token && !this.jwtHelper.isTokenExpired(token)){
      this.userCanAccess = true;
      //console.log('user canAccess',this.userCanAccess);
      return true;
    }
    this.userCanAccess = false;
    //console.log('user canAccess',this.userCanAccess);
    return false;
  }

  async tryActivateToken(){
    await this.authGuard.canActivate();
  }

  async createCar(){
    await this.tryActivateToken();

    this.showUpdatePane=true;
    this.refresh();
    dateValidator();
  }
  cancel():void{
    this.showUpdatePane=false;
  }

  async editCar(car:Car){
    await this.tryActivateToken();

    this.showUpdatePane=true;
    this.vehicle = car;
    dateValidator();

  }
  getCars():void{
    this.carService.getCars()
    .subscribe(
      (response:Response)=>{
        this.vehicles=response.data
        this.vehicles?.forEach(v=>
        {
          v.imagePath = jsonVehiclePath.data.find(img=>img.uniqueNumber==v.uniqueNumber).path;
        });

      });


  }

  save():void{
    if(this.vehicle.id==null){
      this.add(this.vehicle);
    }else{
      this.update(this.vehicle);
    }
    this.refresh();
  }

  refresh():void{
    this.vehicle=new Car();
  }
  update(car:Car):void{
    this.carService.updateCar(car)
    .subscribe(()=>this.getCars());
  }

  add(car:Car):void{
    this.carService.createCar(car)
    .subscribe(s_car=>{
      this.vehicles.push(s_car.data);
    })
  }

  async delete(id:number):Promise<void>{
    await this.tryActivateToken();

    console.log('deleting start ');
    this.vehicles=this.vehicles.filter(v=>v.id!=id);
    this.carService.deleteCar(id).subscribe();
  }

  goBack():void{
    this.location.back();
  }


  handleViewRadioChange(event){
    let target = event.target;
    console.log(this.currentViewType)
  }

}
