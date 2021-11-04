import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-component/app.component';
import { HttpClientModule } from '@angular/common/http';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { FormsModule } from '@angular/forms';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { MyLoginComponent } from './my-login/my-login.component';
import { JwtModule,JwtModuleOptions } from "@auth0/angular-jwt";
import { environment } from "../../src/environments/environment";
import { AuthGuard } from "./guards/auth-guard.service";
import { UserChatComponent } from './user-chat/user-chat.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { VehicleChildComponent } from './vehicle-child/vehicle-child.component';

import {VehicleChildListComponent} from './vehicle-child/vehicle-child-list.component';
import { OwnersComponent } from './owners/owners.component';
import { UserProfileComponent } from './user-profile/user-profile.component'

import {AppAuthComponent} from './app.auth.component';

import {whiteListDomains} from './configs/api-endpoint.constants';

import { UserPenaltyComponent } from "./user-profile/user-penalty-component";
import { CustomPagination } from "./helper-components/custom-pagination.component";
import { UserPersonalCabinetComponent } from './user-personal-cabinet/user-personal-cabinet.component';

import {CreateEditVehicleComponent} from './vehicles/create-edit-vehicle.component';


export function tokenCustomGetter(){
  let token = localStorage.getItem("jwt");
  //console.log(`getting token...`);
  //console.log(`getting token \n ${token}`);
  return token;
}

//preflight request
export const JWT_MODULE_OPTIONS:JwtModuleOptions = {
  config:{
    tokenGetter:tokenCustomGetter,
    whitelistedDomains:[whiteListDomains],//error was here
    blacklistedRoutes:[""]
  }
}


@NgModule({
  declarations: [
    AppAuthComponent,
    AppComponent,
    VehiclesComponent,
    VehicleDetailsComponent,
    MyLoginComponent,
    UserChatComponent,
    VehicleChildComponent,
    VehicleChildListComponent,
    CustomPagination,
    OwnersComponent,
    UserProfileComponent,
    UserPenaltyComponent,
    UserPersonalCabinetComponent,
    CreateEditVehicleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatDatepickerModule,MatNativeDateModule,MatIconModule,MatInputModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot(JWT_MODULE_OPTIONS),
    NoopAnimationsModule,
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
