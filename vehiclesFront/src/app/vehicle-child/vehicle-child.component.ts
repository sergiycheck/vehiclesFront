import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Car } from "../models/car";
import {VehicleChildBaseComponent} from "./vehicle-child-base.componet";

@Component({
  selector: 'app-vehicle-child',
  templateUrl: './vehicle-child.component.html',
  styleUrls: ['./vehicle-child.component.css']
})
export class VehicleChildComponent extends VehicleChildBaseComponent {

}
