import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Possessor} from '../models/Possessor';
import {Response} from '../models/response';
import {UserDataService} from '../services/user.data.service';
import{
  HttpResponse,
  } from '@angular/common/http';

  import { PaginationOptions,RequestParams } from "../models/pagination-options";


@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class OwnersComponent implements OnInit {


  constructor(
    private userService:UserDataService,
  ) { }

  public possessors:Possessor[];
  public possessor:Possessor = new Possessor();


public paginationOptions:PaginationOptions;
public requestParams:RequestParams;
public availablePageSizes=[3,5,10,50];


  ngOnInit() {
    this.getUsers();
  }

  handleClickNext(){
    if(this.requestParams){
      this.requestParams.PageNum+=1;
      // console.log('next clickd ', this.requestParams);

      this.getUsers();
    }
  }

  handleClickPrevious(){
    if(this.requestParams && this.requestParams.PageNum>=1){
      this.requestParams.PageNum -=1;
      // console.log('previous clicked', this.requestParams);

      this.getUsers();
    }
  }

  onChangePageSize(event){
    if(event){
      this.requestParams.PageSize = event;

      // console.log(this.requestParams);
      this.getUsers();
    }

  }


  getUsers(){
    this.userService.getOwners(this.requestParams)
    .subscribe(
      (response:HttpResponse<any>)=>{

        let allPaginationOptions =
          this
          .userService
          .getPaginationOptionsFromResponse(response);
        this.paginationOptions = allPaginationOptions.paginationOptions;
        this.requestParams = allPaginationOptions.requestParams;

        this.possessors = response.body.data;
        console.log('this.possessors.length ',this.possessors.length);
      }
    )
  }


}
