import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable,of } from 'rxjs';
import {BaseDataService} from './base.data.service';
import {catchError,map,tap} from 'rxjs/operators';
import {getUserName} from "../configs/api-endpoint.constants";
import {
  ownersUrl,
  getVehiclesByOwner,
  GetPenaltiesByUserId,
  PayPenalty,
  getOwnerByUniqueNumber,
  updateUser,
  deleteUser
} from "../configs/api-endpoint.constants";


import {Response} from '../models/response';
import { Possessor } from "../models/possessor";

import { Penalty,PenaltyPayRequest } from "../models/penalty";



@Injectable({
  providedIn: 'root'
})
export class UserDataService extends BaseDataService {
  constructor(
    public http:HttpClient,
  ) {
    super(http);
   }


  getOwners(params?:any):Observable<HttpResponse<any>>{
    let httpParams = this.getHttpParams(params);
    return this.getDataWithPagination(
      ownersUrl,
      httpParams,
      'getOwners');
  }



  getOwnerByUniqueNumber(uniqueNumber:string):Observable<Response>{
    const url = getOwnerByUniqueNumber.replace('{uniqueNumber}',uniqueNumber);
    return this.http.get<Response>(url)
      .pipe(
        catchError(this.handleError<Response>(`getOwnerByUniqueNumber ${uniqueNumber}`))
      );
  }

  getUser(tokenValue:string):Observable<Response>{
    const tokenRequest:any={
      token:tokenValue
    }
    return this.http.post<Response>(
      getUserName,
      tokenRequest,
      {
        headers:this.httpOptions.headers
        //.append("Authorization",`Bearer ${tokenValue}`)
      })
    .pipe(
      catchError(this.handleError<Response>('getUserName'))
    );
  }

  updateUser(id:string,formData:any):Observable<any>{
    let url = updateUser.replace('{id}',id);
    return this.http.put(
      url,
      formData,
      {
        reportProgress:true,
        observe:'events'
      }
    ).pipe(
      catchError(this.handleError<any>('updateUser'))
    )
  }

  deleteUser(id:string,token:string):Observable<Response>{
    let url = deleteUser.replace('{id}',id);
    return this.http.post(
      url,
      {
        token:token
      },
      {
        headers:this.httpOptions.headers
      }
    ).pipe(
      catchError(this.handleError<any>('delete user'))
    )
  }


  public payUserPenalty(penaltyPayRequest:PenaltyPayRequest):Observable<Response>{
    const url = PayPenalty
      .replace('{id:int}',penaltyPayRequest.id.toString());

    return this.http.post<Response>(
      url,
      penaltyPayRequest,
      this.httpOptions)
      .pipe(
        catchError(
          this.handleError<Response>(
            `payUserPenalty ${penaltyPayRequest}`))
      );
  }

  getUserPenalties(id:string):Observable<Response>{
    const url =  GetPenaltiesByUserId.replace('{userId}',id);
    return this.http.get<Response>(url)
    .pipe(
      catchError(this.handleError<Response>(`getUserPenalties ${id}`))
    );
  }

  getUserById(id:string):Observable<Response>{
    const url = `${ownersUrl}/${id}`;
    return this.http.get<Response>(url)
    .pipe(
      catchError(this.handleError<Response>(`getUserById ${id}`))
    );
  }

  getVehiclesByOwner(user:Possessor):Observable<Response>{
    return this.http.post(
      getVehiclesByOwner,
      user,
      this.httpOptions
    ).pipe(
      catchError(this.handleError<Response>(`getVehiclesByOwner ${user}`))
    );

  }

}
