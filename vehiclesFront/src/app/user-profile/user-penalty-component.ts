import { Component,
    OnInit,
    Input,
    Output,
    EventEmitter } from '@angular/core';

import { Penalty,PenaltyPayRequest } from "../models/penalty";
import { UserDataService } from "../services/user.data.service";

import {Response} from '../models/response';

@Component({
  selector:'app-user-penalty',
  templateUrl:'./user-penalty-component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserPenaltyComponent implements OnInit{

  @Input() penalty:Penalty;
  @Output() handleHidePenaltyPanel = new EventEmitter<boolean>();
  @Input() userServiceInput:UserDataService;

  public penaltyPayRequest:PenaltyPayRequest = new PenaltyPayRequest();

  public showErrors:boolean=false;
  public errorMessage:string;

  public showSuccessResponse:boolean=false;
  public successMessage:string;

  constructor(){

  }

  ngOnInit(){

  }


  handleClickHidePenalty(){
    this.handleHidePenaltyPanel.emit();
  }

  handleClickPayPenalty(){
    this.penaltyPayRequest.date = new Date(Date.now());
    this.penaltyPayRequest.id = this.penalty.id;
    if(
        !this.penaltyPayRequest.fee ||
        typeof(this.penaltyPayRequest.fee)!=='number'||
        this.penaltyPayRequest.fee<this.penalty.price){
          this.showErrors = true;
          this.errorMessage = 'amount of money to pay penalty is not correct';
          return;
        }

    console.log(this.penaltyPayRequest);
    this.userServiceInput
      .payUserPenalty(this.penaltyPayRequest)
      .subscribe((response:Response)=>{

        this.successMessage = response.data;
        this.showSuccessResponse = true;


        this.showErrors = false;
        this.errorMessage = null;
        this.penaltyPayRequest.fee = null;
      })



  }

}
