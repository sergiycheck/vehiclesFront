import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy} from '@angular/core';

  import { JwtHelperService } from "@auth0/angular-jwt";
  import {UserDataService} from './services/user.data.service';
  import { AuthGuard } from "./../app/guards/auth-guard.service";
  import { CarDataService } from "./services/car.data.service";
  import{Location} from '@angular/common';
  import { Router } from "@angular/router";

  import { Subscription } from 'rxjs';
  import {AuthorizationService} from './services/authorization.service';
  import {VehiclesComponent} from './vehicles/vehicles.component'

@Component({
  selector: 'app-auth-root',
  template:`
    <app-vehicles
      [isAuthenticated]="isAuthenticated"
      ></app-vehicles>
  `
})
export class AppAuthComponent implements OnInit, AfterViewInit,OnDestroy {

  @ViewChild(VehiclesComponent)

  private vehiclesComponent:VehiclesComponent;

  public isAuthenticated:boolean=false;
  public userName:string;
  subscription: Subscription;

  constructor(
    public carService:CarDataService,
    public userData:UserDataService,
    public location:Location,
    public jwtHelper:JwtHelperService,
    public authGuard:AuthGuard,
    public router:Router,

    private authService: AuthorizationService
  ){

  }

  ngOnInit(){
    console.log('AppAuthComponent ngOnInit');

    this.subscription = this.authService.isAuthenticatedObs$.subscribe(isAuth=>{
      this.isAuthenticated = isAuth;
      console.log('AppAuthComponent this.isAuthenticated from subscription',this.isAuthenticated);

    });

  }

  async ngAfterViewInit(){
    this.isAuthenticated = await this.authGuard.canActivateWithoutLogin();
    this.authService.setAuthentication(this.isAuthenticated);
    console.log(' AppAuthComponent ngAfterViewInit');
  }

  ngOnDestroy(){
    console.log('AppAuthComponent ngOnDestroy');
    this.subscription.unsubscribe();
  }


}
