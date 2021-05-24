import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import {AuthGuard} from '../guards/auth-guard.service'
import {Possessor} from '../models/possessor'

@Injectable()
export class AuthorizationService {

  constructor(
    private guard:AuthGuard
  ){

  }


    // Observable string sources
    public isAuthenticatedSource = new Subject<boolean>();
    public userSource = new Subject<Possessor>();

    public deleteUserSource = new Subject<boolean>();

    // Observable string streams
    isAuthenticatedObs$ = this.isAuthenticatedSource.asObservable();
    userObs$ = this.userSource.asObservable();
    deleteUserObs$ = this.deleteUserSource.asObservable();

    setAuthentication(dataAuth:boolean){
      this.isAuthenticatedSource.next(dataAuth);
    }
    setUser(user:Possessor){
      this.userSource.next(user);
    }

    setDeleteUser(isUserDeleted:boolean){
      this.deleteUserSource.next(isUserDeleted)
    }

    canActivate(){
      return this.guard.canActivate();
    }

    canActivateWithoutLogin(){
      return this.guard.canActivateWithoutLogin();
    }
}
