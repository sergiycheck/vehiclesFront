import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { Car } from "./models/car";
import { Observable,of } from 'rxjs';
import {vehiclesUrl} from "./configs/api-endpoint.constants";
import {catchError,map,tap} from 'rxjs/operators';
import {Response} from './models/response';


@Injectable({
  providedIn: 'root'
})
export class CarDataService {

  constructor(
    private http:HttpClient,
  ) { }

  private httpOptions={
    headers:new HttpHeaders({'Accept':'application/json','Content-type':'application/json'})
  };

  getCars():Observable<Car[]>{
    return this.http.get<Car[]>(vehiclesUrl)
    .pipe(
      catchError(this.handleError<Car[]>('getCars',[]))
    );
  }

  getCar(id:number):Observable<Car>{
    return this.http.get<Car>(vehiclesUrl+`/${id}`)
    .pipe(
      catchError(this.handleError<Car>('getCar'))
    );
  }

  createCar(car:Car):Observable<Car>{
    return this.http.post(`${vehiclesUrl}/create`,car,this.httpOptions)
      .pipe(
        tap((car:Car) => console.log(`added car w/ id =${car.id}`)),
        catchError(this.handleError<Car>(`createCar`))
      )
  }
  updateCar(car:Car):Observable<any>{
    return this.http.put(`${vehiclesUrl}/update/${car.id}`,car,this.httpOptions)
    .pipe(
      tap(_ => console.log(`updated car id =${car.id}`)),
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




    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
