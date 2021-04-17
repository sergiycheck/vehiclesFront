import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import {AuthGuard} from '../guards/auth-guard.service'

@Injectable()
export class AuthorizationService {

  constructor(
    private guard:AuthGuard
  ){

  }


    // Observable string sources
    private isAuthenticatedSource = new Subject<boolean>();
    private userNameSource = new Subject<string>();

    // Observable string streams
    isAuthenticatedObs$ = this.isAuthenticatedSource.asObservable();
    userNameObs$ = this.userNameSource.asObservable();

    setAuthentication(dataAuth:boolean){
      this.isAuthenticatedSource.next(dataAuth);
    }
    setUserName(dataName:string){
      this.userNameSource.next(dataName);
    }

    canActivate(){
      return this.guard.canActivate();
    }

    canActivateWithoutLogin(){
      return this.guard.canActivateWithoutLogin();
    }
}
