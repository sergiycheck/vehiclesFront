import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleDetailsComponent } from "../app/vehicle-details/vehicle-details.component";
import { VehiclesComponent } from "../app/vehicles/vehicles.component";
import {MyLoginComponent}from '../app/my-login/my-login.component';
import { AuthGuard } from "./guards/auth-guard.service";
import {UserChatComponent} from './user-chat/user-chat.component';
import {OwnersComponent} from './owners/owners.component'
import {UserProfileComponent} from './user-profile/user-profile.component'

const routes: Routes = [
  {path:'vehicles',component:VehiclesComponent},
  {path:'',redirectTo: '/vehicles',pathMatch: 'full'},//default route
  {path:'vehicle-details/:id',component:VehicleDetailsComponent,canActivate:[AuthGuard]},//check if token is expired
  {path:'auth',component:MyLoginComponent},
  {path:'chat',component:UserChatComponent},
  {path:'owners',component:OwnersComponent},
  {path:'owners/:id',component:UserProfileComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
