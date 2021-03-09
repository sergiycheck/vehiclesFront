import { Component, OnInit,Input } from '@angular/core';
import { CarDataService } from "../services/car.data.service";
import { Car } from "../models/car";
import{Location} from '@angular/common';
import {Response} from '../models/response';
import { AuthGuard } from "../guards/auth-guard.service";
import { Router } from "@angular/router";


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

  constructor(
    private carService:CarDataService,
    private location:Location,
    private router:Router,
    private authGuard:AuthGuard,
  ) { }

  ngOnInit(): void {
    this.getCars()

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
      (response:Response)=>this.vehicles=response.data);
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


}
