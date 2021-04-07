import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Car } from "../models/car";


@Component({
  selector: 'vehicle-child-base',
  template: `
      <div>
          base works!!
      </div>
  `
})
export class VehicleChildBaseComponent implements OnInit {

  @Input() elem:Car;
  @Input() userCanAccess:boolean;

  @Output() deleteRequest = new EventEmitter<number>();

  @Output() editCarRequest = new EventEmitter<Car>();
  @Output() isUserAuthenticatedRequest = new EventEmitter<boolean>();

  constructor(

  ) { }

  ngOnInit(): void {
    this.isUserAuthenticated();
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
