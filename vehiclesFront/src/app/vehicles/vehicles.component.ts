import { Component,
   OnInit,
   AfterViewInit,
   Input } from '@angular/core';

import { CarDataService } from "../services/car.data.service";
import { Car } from "../models/car";
import {CarResource} from '../models/car';

import{Location} from '@angular/common';
import {Response} from '../models/response';
import { AuthGuard } from "../guards/auth-guard.service";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpEvent,HttpEventType } from '@angular/common/http';
import {AppAuthComponent} from '../app.auth.component';
import {UserDataService} from '../services/user.data.service';


declare function dateValidator():any;

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent

  // extends AppAuthComponent
  implements OnInit
  {

public vehicles:CarResource[];
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
currentViewType:string='list-view';


public uploadImgProgress:number;
public uploadImgMessage:string;

@Input() isAuthenticated:boolean;

  constructor(
    public userData:UserDataService,
    public carService:CarDataService,
    public location:Location,
    public router:Router,
    public jwtHelper:JwtHelperService,
    public authGuard:AuthGuard,
  ) {

    // super(carService,userData,location,jwtHelper,authGuard,router)
   }

   getToken=()=> localStorage.getItem("jwt");
   setAuthenticated=()=>{
     this.isAuthenticated=true;
   }
   setUnAuthenticated=()=>{
    this.isAuthenticated=false;
  }


  ngOnInit() {
    this.getCars();

    console.log(' VehiclesComponent ngOnInit');

  }


  async createCar(){


    this.showUpdatePane=true;
    this.refresh();
    dateValidator();

    this.assignVehicleTest();

  }

  private assignVehicleTest(){
    let vehicleTest = this.vehicles[0].dataResource;
    this.vehicle = new Car(
      null,
      "vevev0-12112",
      "honda",
      vehicleTest.color,
      vehicleTest.date,
      vehicleTest.price,
      vehicleTest.carEngine,
      "test descriptions",
      vehicleTest.transmision,
      vehicleTest.drive
    )
  }

  cancel():void{
    this.showUpdatePane=false;
  }

  async editCar(car:Car){


    this.showUpdatePane=true;
    this.vehicle = car;
    dateValidator();

  }

  getCars():void{
    this.carService.getCars()
    .subscribe(
      (response:Response)=>{
        let responseVehicles:Car[]=response.data
        console.log('this.vehicles.length ',responseVehicles.length);

        responseVehicles.forEach(vehicle=>{
          vehicle.imageData =`data:${vehicle.imgFile.contentType};base64,${vehicle.imgFile.fileContents}`
        });
        //todo: set responseVehicles to this.vehicles

        this.vehicles = responseVehicles.map(
          (vehicle)=>{

            return new CarResource(vehicle)
          });


      });


  }

  save(files):void{
    if(this.vehicle.id==null){
      this.add(this.vehicle,files);
    }else{
      this.update(this.vehicle);
    }
    this.refresh();
  }

  refresh():void{
    this.vehicle=new Car();
  }

  update(car:Car):void{

    this.uploadImgProgress =null;
    const formData = new FormData();
    if(!this.fileToUpload){
      console.log('no img selected for vehicle ',car.brand);
    }else{

      Object.entries(car).forEach(([key,data])=>{
        if(key!='imgFile' && key!='imageData' ){
          formData.append(key,data);
        }
      });
      formData.append('Token',this.getToken());
      formData.append('file', this.fileToUpload, this.fileToUpload.name);
    }
    this.carService.updateCar(car.id,formData)
    .subscribe((event)=>{

      var getCarsCallback = (data?: any) : void => {
        this.getCars()
      }
      this.handleEventUpload(event,getCarsCallback);

      // this.getCars()
    });
  }

  fileToUpload: File = null;
  handleFileInput(files: FileList) {
      this.fileToUpload = files.item(0);
  }


  add(car:Car,carImgFiles):void{

    this.uploadImgProgress =null;

    const formData = new FormData();
    if(carImgFiles.length==0){
      console.log('no img selected for vehicle ',car.brand);
    }else{
      let fileToUpload = <File>carImgFiles[0];

      Object.entries(car).forEach(([key,data])=>{

        if(key!='id' && key!='imgFile' && key!='imageData' ){
          formData.append(key,data);
        }

      });
      formData.append('file', fileToUpload, fileToUpload.name);

    }

    this.carService.createCar(formData)
    .subscribe((event)=>{

      var pushCallback = (data?: any) : void => {
        this.vehicles.push(new CarResource(data));
      }
      this.handleEventUpload(event,pushCallback);

    })
  }

  private handleEventUpload(event,callBack:(args?:any)=>any){
    if (event.type === HttpEventType.UploadProgress){
      this.uploadImgProgress = Math.round(100 * event.loaded / event.total);
    }else if (event.type === HttpEventType.Response) {
      this.uploadImgMessage = 'Upload success.';
      callBack(event.body.data);
    }
  }

  async delete(id:number):Promise<void>{


    console.log('deleting start ');
    this.vehicles=this.vehicles.filter(v=>v.dataResource.id!=id);
    this.carService.deleteCar(id,
      {
        id:id,
        token:this.getToken()
      }).subscribe((response)=>{
      console.log(response)
    });
  }

  goBack():void{
    this.location.back();
  }


  handleViewRadioChange(event){
    let target = event.target;
    console.log(this.currentViewType)
  }

}
