import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders,HttpResponse,HttpParams} from '@angular/common/http';
import { Car } from "../models/car";
import { Observable,of } from 'rxjs';
import {vehiclesUrl} from "../configs/api-endpoint.constants";
import {catchError,map,tap} from 'rxjs/operators';
import {Response} from '../models/response';
import {BaseDataService} from './base.data.service';

import { ICanUserAccess } from "../models/car";


@Injectable({
  providedIn: 'root'
})
export class CarDataService extends BaseDataService {

  constructor(
    public http:HttpClient,
  ) {
    super(http);
   }



  getCars(params?:any):Observable<HttpResponse<any>>{

    var mapParams = new Map();
    var httpParams = new HttpParams();
    if(params){
      for(const[key,value] of Object.entries(params)){
        if(key&&value){
          let numValue = Number.parseInt(`${value}`);
          mapParams.set(key,numValue);
          httpParams = httpParams.append(key,`${numValue}`)
        }
      }

      // console.log('car service mapParams', mapParams);
      // console.log('car service httpParams', httpParams);
    }


    return this.http.get<any>(
      vehiclesUrl,
      {
        observe: 'response',
        params:httpParams
      },
      )
    .pipe(
      catchError(this.handleError<any>('getCars'))
    );
  }

  getCar(id:number):Observable<Response>{
    return this.http.get<Response>(vehiclesUrl+`/${id}`)
    .pipe(
      catchError(this.handleError<Response>('getCar'))
    );
  }

  createCar(formData):Observable<any>{
    return this.http.post(
      `${vehiclesUrl}/create`,
      formData,
      {
        reportProgress:true,
        observe: 'events'
      })
      .pipe(
        // tap((car:Car) => console.log(`added car w/ id =${car.id}`)),
        catchError(this.handleError<Car>(`createCar`))
      )
  }

  canUserAccess(canUserAccessRequest:ICanUserAccess):Observable<boolean>{
    return this.http.post(
      `${vehiclesUrl}/canAccess`,
      canUserAccessRequest,
      this.httpOptions
    ).pipe(
      tap(
        // _ => console.log(`can access car with id ${canUserAccessRequest.id}`)
      ),
      catchError(this.handleError<any>(`canUserAccess`))
    )
  }

  updateCar(id,formData):Observable<any>{
    return this.http.put(
      `${vehiclesUrl}/update/${id}`,
      formData,
      {
        reportProgress:true,
        observe: 'events'
      })
    .pipe(
      tap(_ => console.log(`updated car id =${id}`)),
      catchError(this.handleError<any>(`updatedCar`))
    )
  }


  deleteCar(id:number,canUserAccessRequest:ICanUserAccess):Observable<any>{
    return this.http.post(
      `${vehiclesUrl}/delete/${id}`,
      canUserAccessRequest,
      this.httpOptions)
    .pipe(
      tap(_ => console.log(`deleted car id =${id}`)),
      catchError(this.handleError<any>(`deleteCar`))
    )
  }

}
