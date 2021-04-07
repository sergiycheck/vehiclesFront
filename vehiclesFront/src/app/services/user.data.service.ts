import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable,of } from 'rxjs';
import {BaseDataService} from './base.data.service';
import {catchError,map,tap} from 'rxjs/operators';
import {getUserName} from "../configs/api-endpoint.constants";
import {ownersUrl,getVehiclesByOwner} from "../configs/api-endpoint.constants";
import {Response} from '../models/response';
import { Possessor } from "../models/possessor";

@Injectable({
  providedIn: 'root'
})
export class UserDataService extends BaseDataService {
  constructor(
    public http:HttpClient,
  ) {
    super(http);
   }


  getOwners():Observable<Response>{
    return this.http.get<Response>(ownersUrl)
    .pipe(
      catchError(this.handleError<Response>('getOwners'))
    );
  }

  getUserName(tokenValue:string):Observable<string>{
    const tokenRequest:any={
      token:tokenValue
    }
    return this.http.post<string>(
      getUserName,
      tokenRequest,
      this.httpOptions)
    .pipe(
      catchError(this.handleError<string>('getUserName'))
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
