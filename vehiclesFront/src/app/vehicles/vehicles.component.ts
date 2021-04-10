import { Component, OnInit,Input } from '@angular/core';
import { CarDataService } from "../services/car.data.service";
import { Car } from "../models/car";
import{Location} from '@angular/common';
import {Response} from '../models/response';
import { AuthGuard } from "../guards/auth-guard.service";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpEvent,HttpEventType } from '@angular/common/http';


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
currentViewType:string='list-view';

public userCanAccess:boolean=false;

public uploadImgProgress:number;
public uploadImgMessage:string;


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

    this.assignVehicleTest();

  }

  private assignVehicleTest(){
    let vehicleTest = this.vehicles[0];
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
        console.log('this.vehicles.length ',this.vehicles.length);
        this.vehicles.forEach(vehicle=>{
          vehicle.imageData = `data:${vehicle.imgFile.contentType};base64,${vehicle.imgFile.fileContents}`
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
        this.vehicles.push(data);
      }
      this.handleEventUpload(event,pushCallback);

      // if (event.type === HttpEventType.UploadProgress)
      //   this.uploadImgProgress = Math.round(100 * event.loaded / event.total);
      // else if (event.type === HttpEventType.Response) {
      //   this.uploadImgMessage = 'Upload success.';
      //   this.vehicles.push(event.body.data);
      // }

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
