import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-component/app.component';
import { HttpClientModule } from '@angular/common/http';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { FormsModule } from '@angular/forms';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { MyLoginComponent } from './my-login/my-login.component';
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from "../../src/environments/environment";
import { AuthGuard } from "./guards/auth-guard.service";


export function tokenCustomGetter(){
  let token = localStorage.getItem("jwt");
  //console.log(`getting token...`);
  //console.log(`getting token \n ${token}`);
  return token;
}

@NgModule({
  declarations: [
    AppComponent,
    VehiclesComponent,
    VehicleDetailsComponent,
    MyLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:tokenCustomGetter,
        whitelistedDomains:["localhost:5010"],//error was here
        blacklistedRoutes:[""]
      }
    }),

  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
