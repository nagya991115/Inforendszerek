import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../models/car';
import { Driver } from '../models/driver';
import { Trip } from '../models/trip';
import { CarService } from '../services/car.service';
import { DriverService } from '../services/driver.service';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
})
export class TripFormComponent implements OnInit {
  tripForm = this.formBuilder.group({
    id:[],
    auto: ['---',Validators.required],
    sofor:['---',Validators.required],
    utazas_ideje:['---',Validators.required],
    utazas_jellege:['',Validators.required],
    indulas_helye:['---',Validators.compose([Validators.required,Validators.minLength(3)])],
    erkezes_helye:['---',Validators.compose([Validators.required,Validators.minLength(3)])],
    megtett_tavolsag:[2,Validators.compose([Validators.required,Validators.min(1)])],
    auto_kmallas:[]
  }); 
  drivers: Driver[] =[];
  cars: Car[] = [];
  visszaut : boolean = false

  lowerDateTrips : Trip[] = []
  greaterDateTrips : Trip[] = []
  

  constructor(
    private formBuilder : FormBuilder,
    private tripService: TripService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private carService : CarService,
    private driverService : DriverService,
    private datePipe: DatePipe
  ) {}

  get f(): { [key: string]: AbstractControl } {
    return this.tripForm.controls;
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    this.cars = await this.carService.getAll();
    const myDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.drivers = await this.driverService.getOkLicense(myDate as string);
    

    if(id) {      
      const trip = await this.tripService.getTripByID(id);
      this.tripForm.controls['id'].setValue(trip?.id);
      this.tripForm.controls['utazas_ideje'].setValue(trip?.utazas_ideje);
      this.tripForm.controls['utazas_jellege'].setValue(trip?.utazas_jellege);
      this.tripForm.controls['indulas_helye'].setValue(trip?.indulas_helye);
      this.tripForm.controls['erkezes_helye'].setValue(trip?.erkezes_helye);
      this.tripForm.controls['megtett_tavolsag'].setValue(trip?.megtett_tavolsag);
      this.tripForm.controls['auto_kmallas'].setValue(trip?.auto_kmallas);
      this.tripForm.controls['sofor'].setValue(trip?.sofor.nev);
      this.tripForm.controls['auto'].setValue(trip?.auto.rendszam);
    }

  }

  async addTrip(trip_input : any) {
    const trip = trip_input
    this.greaterDateTrips = await this.tripService.getAllWhereDateGreaterThan(trip.utazas_ideje,trip.auto.id)
    this.lowerDateTrips = await this.tripService.getAllWhereDateLowerThan(trip.utazas_ideje,trip.auto.id)
    if(this.lowerDateTrips.length == 0)
    {
      trip.auto_kmallas = trip.auto.kmoraallas + trip.megtett_tavolsag
    }
    else
    {
      trip.auto_kmallas = this.lowerDateTrips[this.lowerDateTrips.length-1].auto_kmallas + trip.megtett_tavolsag
    }
    await this.tripService.addTrip(trip);
    if(this.greaterDateTrips.length !=0)
    {
      for (let i = 0; i < this.greaterDateTrips.length; i++) {
        const tripSeged = this.greaterDateTrips[i]
        this.lowerDateTrips = await this.tripService.getAllWhereDateLowerThan(tripSeged.utazas_ideje,tripSeged.auto.id)
        tripSeged.auto_kmallas = this.lowerDateTrips[this.lowerDateTrips.length-1].auto_kmallas + tripSeged.megtett_tavolsag
        await this.tripService.addTrip(tripSeged)
      }
    }
  }

  async onClick()
  {
      var trip = this.tripForm.value
      await this.addTrip(trip)
      if(this.visszaut)
      {
        const today = new Date(trip.utazas_ideje)
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        var dateString = new Date(tomorrow.getTime() - (tomorrow.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
        
        const temp = trip.erkezes_helye
        trip.erkezes_helye = trip.indulas_helye
        trip.indulas_helye = temp
        trip.utazas_ideje = dateString
        this.addTrip(trip)
      }
      this.router.navigateByUrl('#');    
  }


}