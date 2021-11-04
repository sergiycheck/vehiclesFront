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
import { HttpEvent,HttpEventType, HttpResponse } from '@angular/common/http';
import {AppAuthComponent} from '../app.auth.component';
import {UserDataService} from '../services/user.data.service';

import { PaginationOptions,RequestParams,SearchFilterOptions } from "../models/pagination-options";



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

public paginationOptions:PaginationOptions;
public requestParams:RequestParams;

public searchFilterOptions = new SearchFilterOptions();

public availablePageSizes=[3,5,10,50];

  constructor(
    public userData:UserDataService,
    public carService:CarDataService,
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
    const searchObj = {...this.requestParams, ...this.searchFilterOptions};
    this.getCars(searchObj);

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
      vehicleTest.price,
      vehicleTest.carEngine,
      "test descriptions",
      vehicleTest.transmision,
      vehicleTest.drive
    )
    this.vehicle.date = vehicleTest.date;
  }

  cancel():void{
    this.showUpdatePane=false;
  }

  editCar(car:Car){

    this.showUpdatePane=true;

    this.vehicle = new Car(car?.id,car?.uniqueNumber,car?.brand,car?.color,car?.price,car?.carEngine,car?.description,car?.transmision,car?.drive,car?.forSale,car?.updateImage, car?.imgFile,car?.imageData);
    this.vehicle.date = car?.date;


    dateValidator();

  }

  handleClickNext(){
    if(this.requestParams){
      this.requestParams.PageNum+=1;
      // console.log('next clickd ', this.requestParams);

      const searchObj = {...this.requestParams, ...this.searchFilterOptions};
      this.getCars(searchObj);
    }
  }

  handleClickPrevious(){
    if(this.requestParams && this.requestParams.PageNum>=1){
      this.requestParams.PageNum -=1;
      // console.log('previous clicked', this.requestParams);

      const searchObj = {...this.requestParams, ...this.searchFilterOptions};
      this.getCars(searchObj);
    }
  }

  onChangePageSize(event){
    if(event){
      this.requestParams.PageSize = event;

      // console.log(this.requestParams);
      const searchObj = {...this.requestParams, ...this.searchFilterOptions};
      this.getCars(searchObj);
    }

  }

  findBtnHandleClick(){
    const searchObj = {...this.requestParams, ...this.searchFilterOptions};
    console.log('request params', searchObj)
    this.getCars(searchObj);
  }

  getCars(searchParams:any):void{

    this.carService.getCars(searchParams)
    .subscribe(
      (response:HttpResponse<any>)=>{

        let allPaginationOptions =
          this
          .carService
          .getPaginationOptionsFromResponse(response);
        this.paginationOptions = allPaginationOptions.paginationOptions;
        this.requestParams = allPaginationOptions.requestParams;

        let responseVehicles:Car[]=response.body.data;

        console.log('this.vehicles.length ',responseVehicles.length);

        responseVehicles.forEach(vehicle=>{
          if(vehicle.imgFile){
            vehicle.imageData =`data:${vehicle.imgFile.contentType};base64,${vehicle.imgFile.fileContents}`
          }

        });
        //todo: set responseVehicles to this.vehicles

        this.vehicles = responseVehicles.map(
          (vehicle)=>{
            //const date = new Date(vehicle.date);
            //console.log(date.toISOString())

            return new CarResource(vehicle)
          });


      });


  }

  fileToUpload: File = null;
  handleFileInput(files: FileList) {
      this.fileToUpload = files.item(0);
  }

  save(files):void{
    //let fileToUpload = <File>carImgFiles[0];
    this.uploadImgProgress = null;

    console.log({...this.vehicle, date:this.vehicle.date});

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

    const formData = new FormData();
    this.addDataToFormData(car,formData);

    console.log('creating form data');
    Object.entries(car).forEach(([key,data])=>{
      if(key!='imgFile' && key!='imageData' ){
        this.handleFormDataFulfilling(formData,key,data);
      }
    });

    this.logFormData(formData);

    this.carService.updateCar(car.id,formData)
    .subscribe((event)=>{

      var getCarsCallback = (data?: any) : void => {
        const searchObj = {...this.requestParams, ...this.searchFilterOptions};
        this.getCars(searchObj);
      }
      this.handleEventUpload(event,getCarsCallback);

      // this.getCars()
    });
  }
  private handleFormDataFulfilling(formData:FormData,name:string,value:string|Blob){
    console.log(`key: ${name}, data ${value} `);

    if(name.includes('_date')){
      formData.append("Date", value);
    }else{
      formData.append(name,value);
    }
  }

  private logFormData(formData:FormData){
    console.log('formData ')
    formData.forEach(d=>console.log(d));
  }

  private addDataToFormData(car,formData){

    if(!car.forSale){
      formData.append('ForSale',JSON.stringify(false));
    }
    formData.append('token',this.getToken());

    if(this.fileToUpload){
      formData.append('UpdateImage', JSON.stringify(true));
      car.updateImage = 'true';
      formData.append('file', this.fileToUpload, this.fileToUpload.name);
    }
    else if(car.imgFile && !this.fileToUpload){
      car.updateImage = 'false';
      formData.append('UpdateImage', JSON.stringify(false));
    }


  }

  add(car:Car):void{

    const formData = new FormData();
    this.addDataToFormData(car,formData);

    console.log('creating form data');
    Object.entries(car).forEach(([key,data])=>{

      if(key!='id' && key!='imgFile' && key!='imageData' ){
        this.handleFormDataFulfilling(formData,key,data);

      }

    });

    this.logFormData(formData);


    this.carService.createCar(formData)
    .subscribe((event)=>{

      var pushCallback = (data?: any) : void => {
        this.vehicles.push(new CarResource(data));
      }
      this.handleEventUpload(event,pushCallback);

    })
  }

  private handleEventUpload(event,callBack:(args?:any)=>any){
    if (event?.type === HttpEventType.UploadProgress){
      this.uploadImgProgress = Math.round(100 * event.loaded / event.total);
    }else if (event?.type === HttpEventType.Response) {
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




  handleViewRadioChange(event){
    let target = event.target;
    console.log(this.currentViewType)
  }

}
