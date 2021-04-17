import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable,of } from 'rxjs';

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
