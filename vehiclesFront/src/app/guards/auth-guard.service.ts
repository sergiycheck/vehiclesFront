import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import {refreshTokenPath} from '../configs/api-endpoint.constants';
import {catchError,map,tap} from 'rxjs/operators';


declare function showLoginModal():any;

export class authSuccessResponse{
  constructor(
    public token?:string,
    public refreshToken?:string
  ){

  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private http:HttpClient) {
  }

  private httpOptions={
    headers:new HttpHeaders({
      'Accept':'application/json',
      'Content-type':'application/json'
    })
  };

  async canActivateWithoutLogin(){
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    const isRefreshSuccessful = await this.tryRefreshToken(token);
    return isRefreshSuccessful;
  }

  async canActivate():Promise<boolean> {
    console.log("activation...")
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)){
      console.log(`can be activated. \n Decoded token: \n`);
      //console.log(this.jwtHelper.decodeToken(token));
      return true;
    }
    const isRefreshSuccessful = await this.tryRefreshToken(token);
    if(!isRefreshSuccessful){

      showLoginModal();

    }
    return isRefreshSuccessful;
  }

  async tryRefreshToken(token:string):Promise<boolean>{
    console.log('refreshing token...');
    const refreshToken:string = localStorage.getItem('refreshToken');
    if(!token||!refreshToken){
      return false;
    }
    const credentials = JSON.stringify({
      token:token,
      refreshToken:refreshToken});

    return this.getRefreshingResult(credentials);

  }

  private getRefreshingResult(credentials):Promise<boolean>{
    return new Promise((resolve,reject)=>{
      this.http.post(
        refreshTokenPath,
        credentials,
        this.httpOptions
      ).pipe(
        tap(_=>console.log('token is refreshed')),
        catchError(this.handleError<any>('tryRefreshToken'))
      ).subscribe((response:authSuccessResponse)=>{
        console.log(`response:`);
        console.log(response);
        if(response){
          const token = response.token;
          const refreshToken = response.refreshToken;
          localStorage.setItem('jwt',token);
          localStorage.setItem('refreshToken',refreshToken);
          resolve(true);
        }else{
          reject(false);
          // localStorage.removeItem("jwt");
          // localStorage.removeItem("refreshToken");
        }

      });

    });
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
    let apiResponse = `api response message: \n${error.error.errors.join(' ')}`;
    console.log(apiResponse);
    return of(result as T);
  };
}



}
