import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarFormComponent } from './car-form/car-form.component';
import { CarListComponent } from './car-list/car-list.component';
import { DriverFormComponent } from './driver-form/driver-form.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { LoginComponent } from './login/login.component';
import { MonthlyReportListComponent } from './monthly-report-list/monthly-report-list.component';
import { TripFormComponent } from './trip-form/trip-form.component';
import { TripsListComponent } from './trips-list/trips-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: 'car-list',
    component: CarListComponent
  },
  {
    path: 'car-form',
    component: CarFormComponent
  },
  {
    path: 'driver-list',
    component: DriverListComponent
  },
  {
    path: 'driver-form',
    component: DriverFormComponent
  },
  {
    path: 'trip-form',
    component: TripFormComponent
  },
  {
    path: 'monthly-report-list',
    component: MonthlyReportListComponent
  },
  {
    path: 'trips-list',
    component: TripsListComponent
  },
  {
    path : '',
    component: LoginComponent
  },
  {
    path : 'user-list',
    component : UserListComponent
  },
  {
    path : 'user-form',
    component : UserFormComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
