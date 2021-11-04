import { Component, OnInit } from '@angular/core';
import { Car } from "../models/car";
import{Location} from '@angular/common';
import {CarDataService  } from "../services/car.data.service";
import{ActivatedRoute} from '@angular/router';
import {Response} from '../models/response';

import {UserDataService} from '../services/user.data.service';
import { Possessor } from '../models/Possessor';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  public vehicle:Car;
  id:number;
  public possessors:Possessor[];


  constructor(
    private carService:CarDataService,
    private location:Location,
    private route:ActivatedRoute,
    private userService:UserDataService

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(pmap=>{
      this.id =+ pmap.get('id');
      this.getVehicle();
    })
  }

  getOwnerByUniqueNumber(){

    if(this.vehicle &&
      this.vehicle.uniqueNumber &&
      this.vehicle.uniqueNumber!=''){
        this.userService.getOwnerByUniqueNumber(this.vehicle.uniqueNumber)
        .subscribe(response=>{
          if(response && response.data){

            console.log(response.data);

            if(Array.isArray(response.data)){
              this.possessors = response.data;

            }

          }
        })
    }

  }


  getVehicle():void{
    this.carService.getCar(this.id)
    .subscribe(response => {
      this.vehicle = response.data;
      this.vehicle.imageData = `data:${this.vehicle.imgFile.contentType};base64,${this.vehicle.imgFile.fileContents}`;

      this.getOwnerByUniqueNumber();
    });
  }


  goBack():void{
    this.location.back();
  }

}
