import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../models/car';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars: Car[] | undefined = undefined;
  searchQuery = ''
  isAdmin = false;

  constructor(
    private carService : CarService,
    private router: Router
    ) { }

  async ngOnInit() {
    this.cars = await this.carService.getAll();
    this.isAdmin = sessionStorage.getItem('role') === "1"
  }

  async search() {
    this.cars = await this.carService.filterCar(this.searchQuery);
  }

  navigateToCarForm(id: any) {
    this.router.navigate([ '/car-form' ], {
      queryParams: {
        id: id
      }
    });
  }

}
