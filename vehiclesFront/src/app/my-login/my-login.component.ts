import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import {login} from '../configs/api-endpoint.constants';
import { map, catchError, throwIfEmpty } from 'rxjs/operators';
import { Observable,of } from 'rxjs';
import { AuthGuard } from "../guards/auth-guard.service";
import { JwtHelperService } from "@auth0/angular-jwt";


@Component({
  selector: 'app-my-login',
  templateUrl: './my-login.component.html',
  styleUrls: ['./my-login.component.css']
})
export class MyLoginComponent implements OnInit {

  @Output() handleHideLoginPanelRequest = new EventEmitter<boolean>();
  @Output() loginRequest = new EventEmitter();


  email:string;
  password:string;
  showLoginErrors:boolean=false;
  public loginErrors:string='login response contains errors:\n';

  constructor(
    private router:Router,
    private http:HttpClient,
    private authGuard:AuthGuard,
    private jwtHelper:JwtHelperService,
  ) { }

  private httpOptions={
    headers:new HttpHeaders({
      'Accept':'application/json',
      'Content-type':'application/json'
    })
  };

  ngOnInit(): void {
    // console.log("refreshing from login component");
    // if(this.authGuard.canActivate()){
    //   this.router.navigate(['/']);
    // }

  }

  hideLoginPanel(){
    this.handleHideLoginPanelRequest.emit();
  }


  onSubmit(form:NgForm){
    this.hideLoginPanel();

    console.log(`${form.value.email} \n ${form.value.password} \n ${form.value}`);
    const credentials = JSON.stringify(form.value);
    console.log(credentials);
    this.http.post(
      login,
      credentials,
      this.httpOptions,
      ).pipe(
        map((res:any)=>{
          if (!res) {
            throw new Error('Value expected!');
          }
          return res;
        }),
        catchError(this.handleError<any>('login'))
      ).subscribe(response=>{
        console.log(`response \n ${response}`);
        if(response!==undefined){
          const token = (<any>response).token;
          const refreshToken = (<any>response).refreshToken;
          if(token!=null ||
            token!=undefined||
            token!='' ||
            refreshToken!=null ||
            refreshToken!=undefined||
            refreshToken!=''){
              console.log('logined from login component');

              localStorage.setItem('jwt',token);
              localStorage.setItem('refreshToken',refreshToken);
              // this.router.navigate(['']);
              this.loginRequest.emit();
          }
        }

      },
      err=>{
        this.showLoginErrors=true;
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
    this.showLoginErrors=true;
    let apiResponse = `api response message: \n${error.error.errors.join(' ')}`;
    console.log(apiResponse);
    this.loginErrors = this.loginErrors.concat(apiResponse);
    return of(result as T);
  };
}



//UserLoginRequest
//string Email
//string Password


}
