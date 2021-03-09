import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable,of } from 'rxjs';
import {BaseDataService} from './base.data.service';
import {catchError,map,tap} from 'rxjs/operators';
import {getUserName} from "../configs/api-endpoint.constants";


@Injectable({
  providedIn: 'root'
})
export class UserDataService extends BaseDataService {
  constructor(
    public http:HttpClient,
  ) {
    super(http);
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

}
