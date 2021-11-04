import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import {login,register} from '../configs/api-endpoint.constants';
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
  userName:string;

  showLoginErrors:boolean=false;
  public loginErrors:string='login response contains errors:\n';

  public showLoginForm:boolean=true;
  public showRegisterForm:boolean=false;

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

  handleClickShowRegisterForm(){

    this.showLoginForm=false;
    this.showRegisterForm=true;
  }
  handleClickShowLoginForm(){

    this.showRegisterForm=false;
    this.showLoginForm=true;

  }

  ngOnInit(): void {
    console.log("ngOnInit MyLoginComponent");
    // if(this.authGuard.canActivate()){
    //   this.router.navigate(['/']);
    // }

  }

  hideLoginPanel(){
    this.handleHideLoginPanelRequest.emit();
  }


  onSubmitRegister(form:NgForm){

    if(!form.value ||
      !form.value.email||
      !form.value.password||
      !form.value.userName){
        this.showLoginErrors=true;
        this.loginErrors = 'register data can not be empty';
        return;
    }

    this.showLoginErrors=false;
    this.hideLoginPanel();

    console.log(
      `${form.value.email} \n
      ${form.value.password} \n
      ${form.value.userName} \n
      ${form.value}`);

    const credentials = JSON.stringify(form.value);
    console.log(credentials);

    this.http.post(
      register,
      credentials,
      this.httpOptions
    ).pipe(
      catchError(this.handleError<any>('onSubmitRegister'))
    ).subscribe(response=>{
      console.log(`register response \n ${response}`);

      if(response &&
        response.token &&
        response.refreshToken){

          this.hideLoginPanel();

          const {token,refreshToken} = response;

          localStorage.setItem('jwt',token);
          localStorage.setItem('refreshToken',refreshToken);

          this.loginRequest.emit();
      }

    },error=>{
      console.log('register response contains errors');
      if(error && error.Errors){
        this.loginErrors = error.Errors;
        this.showLoginErrors=true;
      }

    });


  }

  onSubmit(form:NgForm){


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
              this.hideLoginPanel();

              console.log('logined from login component');

              localStorage.setItem('jwt',token);
              localStorage.setItem('refreshToken',refreshToken);
              // this.router.navigate(['']);
              this.loginRequest.emit();
          }
        }

      },
      err=>{
        console.log(' login response contains errors');
        if(err && err.Errors){
          this.loginErrors = err.Errors;
          this.showLoginErrors=true;
        }
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
