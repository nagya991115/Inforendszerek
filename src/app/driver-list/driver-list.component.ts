import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Driver } from '../models/driver';
import { DriverService } from '../services/driver.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  drivers : Driver[] | undefined = undefined;
  searchQuery = ''
  isAdmin = false;

  constructor(
    private driverService : DriverService,
    private router : Router
  ) { }

  async ngOnInit() {
    this.drivers = await this.driverService.getAll();
    this.isAdmin= sessionStorage.getItem('role') === "1"

  }

  isOldDrivingLicense(driver : Driver){
    const currentDate = new Date()
    const driverLicense = new Date(driver.jogositvany_ervenyesseg)
    return currentDate > driverLicense
  }

  async search() {
    this.drivers = await this.driverService.filterDriver(this.searchQuery);
  }

  navigateToDriverForm(id: any) {
    this.router.navigate([ '/driver-form' ], {
      queryParams: {
        id: id
      }
    });
  }

}
