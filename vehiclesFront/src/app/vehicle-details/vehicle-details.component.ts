import { Component, OnInit } from '@angular/core';
import { Car } from "../models/car";
import{Location} from '@angular/common';
import {CarDataService  } from "../car.data.service";
import{ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  public vehicle:Car;
  id:number;

  constructor(
    private carService:CarDataService,
    private location:Location,
    private route:ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.id =+this.route.snapshot.paramMap.get('id');
    this.getVehicle();
  }
  getVehicle():void{
    this.carService.getCar(this.id).subscribe(v => this.vehicle =v);
  }
  goBack():void{
    this.location.back();
  }

}
