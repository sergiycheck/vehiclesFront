import { Component, OnInit,Input } from '@angular/core';
import { CarDataService } from "../car.data.service";
import { Car } from "../models/car";
import{Location} from '@angular/common';
import {Response} from '../models/response';

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
  ) { }

  ngOnInit(): void {
    this.getCars()

  }
  createCar():void{
    this.showUpdatePane=true;
    this.refresh();
  }
  cancel():void{
    this.showUpdatePane=false;
  }
  editCar(car:Car):void{
    this.showUpdatePane=true;
    this.vehicle = car;
  }
  getCars():void{
    this.carService.getCars()
    .subscribe((response:Response)=>this.vehicles=response.data);
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
      this.vehicles.push(s_car);
    })
  }

  delete(id:number):void{
    this.vehicles=this.vehicles.filter(v=>v.id!=id);
    this.carService.deleteCar(id).subscribe();
  }

  goBack():void{
    this.location.back();
  }


}
