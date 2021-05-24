import { Component,
  OnInit,
  Input,
  Output,
  AfterViewInit,
  EventEmitter,ChangeDetectionStrategy } from '@angular/core';
import { Car } from "../models/car";
import { CarDataService } from "../services/car.data.service";

@Component({
  selector: 'vehicle-child-base',
  template: `
      <div>
          base works!!
      </div>
  `,
  changeDetection:ChangeDetectionStrategy.Default
})
export class VehicleChildBaseComponent
  implements
    OnInit,
    AfterViewInit {

  @Input() vehicle:Car;
  @Input() userCanAccess:boolean;

  @Input() token:string;
  @Input() carDataService:CarDataService;

  @Output() deleteRequest = new EventEmitter<number>();

  @Output() editCarRequest = new EventEmitter<Car>();
  @Output() isUserAuthenticatedRequest = new EventEmitter<boolean>();

  public isUserAllowedForAction:boolean=false;

  ngOnInit(): void {
    // console.clear();
    // console.log(`VehicleChildBaseComponent ngOnInitCalled with vehicle \n ${this.vehicle.brand}`);
    // this.isUserAuthenticated();

  }
  ngAfterViewInit(){
    // console.log(' VehicleChildBaseComponent AfterViewInit');
    this.canUserAccess();
  }

  canUserAccess(){

    return this.carDataService.canUserAccess(
      {
        id:this.vehicle.id,
        token:this.token
      })
      .subscribe((response:Boolean)=>{
        // console.log('is user allowed for edit and delete',response);

        if(typeof(response)=='boolean'){
          this.isUserAllowedForAction=response;
        }
      })

  }

  delete(id:number){
    this.deleteRequest.emit(id);
  }

  isUserAuthenticated(){
    this.isUserAuthenticatedRequest.emit();
  }

  editCar(car:Car){
    this.editCarRequest.emit(car);
  }
}
