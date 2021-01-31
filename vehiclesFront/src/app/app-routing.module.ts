import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleDetailsComponent } from "../app/vehicle-details/vehicle-details.component";
import { VehiclesComponent } from "../app/vehicles/vehicles.component";
import {MyLoginComponent}from '../app/my-login/my-login.component';
import { AuthGuard } from "./guards/auth-guard.service";

const routes: Routes = [
  {path:'vehicles',component:VehiclesComponent},
  {path:'',redirectTo: '/vehicles',pathMatch: 'full'},//default route
  {path:'vehicle-details/:id',component:VehicleDetailsComponent,canActivate:[AuthGuard]},//check if token is expired
  {path:'auth',component:MyLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
