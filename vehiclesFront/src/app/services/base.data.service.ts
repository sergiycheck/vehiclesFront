import { Injectable } from '@angular/core';
import{
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpParams} from '@angular/common/http';
import { Observable,of } from 'rxjs';
import {catchError,map,tap} from 'rxjs/operators';
import { PaginationOptions,RequestParams } from "../models/pagination-options";

@Injectable({
  providedIn: 'root'
})
export class BaseDataService {
  constructor(
    public http:HttpClient,
  ) { }

public httpOptions={
  headers:new HttpHeaders({'Accept':'application/json','Content-type':'application/json'})
  };


public getPaginationOptionsFromResponse
  (response:HttpResponse<any>){
    const pagination = response.headers.get('x-pagination');
      if(pagination){
        let paginationOptions = JSON.parse(pagination);
        let requestParams = {
          PageNum: paginationOptions.CurrentPage,
          PageSize: paginationOptions.PageSize
        }
        return {
          paginationOptions,
          requestParams
        }
      }

  }

public getHttpParams(params):HttpParams{
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

  }
  return httpParams;
}

public getDataWithPagination(
  url:string,
  httpParams:HttpParams,
  callerName:string
):Observable<HttpResponse<any>>{
  return this.http.get<any>(
    url,
    {
      observe: 'response',
      params:httpParams
    },
    )
  .pipe(
    catchError(this.handleError<any>(callerName))
  );
}

    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
public handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    if(error){
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
    }

    return of(result as T);
  };
}

}
