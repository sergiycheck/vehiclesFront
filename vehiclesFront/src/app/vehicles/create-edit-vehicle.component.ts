import { Component,
  OnInit,
  Input,
  Output,
  EventEmitter } from '@angular/core';

  import {Car} from '../models/car'

  @Component({
    selector:'app-create-edit-vehicle',
    templateUrl:'./create-edit.vehicle.html',
    styleUrls: ['./vehicles.component.css']
  })
  export class CreateEditVehicleComponent implements OnInit{

    @Input() vehicle: Car;
    @Input() uploadImgProgress:number;
    @Input() fileToUpload: File;
    @Input() uploadImgMessage:string;

    @Output() fileInputHandler = new EventEmitter<FileList>()
    @Output() saveHandler = new EventEmitter()
    @Output() hidePanelHandler = new EventEmitter()

    constructor(){
    }
    ngOnInit(){
    }
    handleFileInput(files: FileList){
      this.fileInputHandler.emit(files);
    }
    save(files){
      this.saveHandler.emit(files);
    }

    hidePanel(){
      this.hidePanelHandler.emit();
    }
  }
