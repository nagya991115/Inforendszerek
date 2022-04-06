import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.css']
})
export class TripsListComponent implements OnInit {

  trips : Trip[] = []
  isAdmin = false;

  constructor(
    private router: Router,
    private tripService : TripService
    ) { }

  async ngOnInit() {
    this.trips = await this.tripService.getAllTrips();
    this.isAdmin = sessionStorage.getItem('role') === "1"
  }

  navigateToTripForm(id: any) {
    this.router.navigate([ '/trip-form' ], {
      queryParams: {
        id: id
      }
    });
  }

}
