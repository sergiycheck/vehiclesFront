import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { Car } from "../models/car";
import { Observable,of } from 'rxjs';
import {vehiclesUrl} from "../configs/api-endpoint.constants";
import {catchError,map,tap} from 'rxjs/operators';
import {Response} from '../models/response';
import {BaseDataService} from './base.data.service';


@Injectable({
  providedIn: 'root'
})
export class CarDataService extends BaseDataService {

  constructor(
    public http:HttpClient,
  ) {
    super(http);
   }



  getCars():Observable<Response>{
    return this.http.get<Response>(vehiclesUrl)
    .pipe(
      catchError(this.handleError<Response>('getCars'))
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


  deleteCar(id:number):Observable<any>{
    return this.http.delete(`${vehiclesUrl}/delete/${id}`,this.httpOptions)
    .pipe(
      tap(_ => console.log(`deleted car id =${id}`)),
      catchError(this.handleError<any>(`deleteCar`))
    )
  }

}
