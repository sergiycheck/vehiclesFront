import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleDetailsComponent } from "../app/vehicle-details/vehicle-details.component";
import { VehiclesComponent } from "../app/vehicles/vehicles.component";


const routes: Routes = [
  {path:'vehicles',component:VehiclesComponent},
  {path:'',redirectTo: '/vehicles',pathMatch: 'full'},//default route
  {path:'vehicle-details/:id',component:VehicleDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
