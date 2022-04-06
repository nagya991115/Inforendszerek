import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../models/car';
import { Report } from '../models/report';
import { Trip } from '../models/trip';
import { CarService } from '../services/car.service';
import { DriverService } from '../services/driver.service';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-monthly-report-list',
  templateUrl: './monthly-report-list.component.html',
  styleUrls: ['./monthly-report-list.component.css']
})
export class MonthlyReportListComponent implements OnInit {

  reportForm!: FormGroup;
  cars : Car[] = []
  trips : Trip[] = []
  private_trips : Trip[] = []
  corporate_trips : Trip[] = []
  startKm : number = 0
  endKm : number = 0
  auto : Car = {
    id: '',
    rendszam: '',
    tipus: '',
    uzemanyag: '',
    fogyasztas: 0,
    kmoraallas: 0
  }
  private_cost : Report = {
    megtett_tavolsag : 0,
    fogyasztas_ft : 0,
    altalany_dij : 0,
    osszes_koltseg : 0
  } 
  corporate_cost : Report = {
    megtett_tavolsag : 0,
    fogyasztas_ft : 0,
    altalany_dij : 0,
    osszes_koltseg : 0
  } 


  constructor(
    private formBuilder : FormBuilder,
    private carService : CarService,
    private tripService : TripService
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.reportForm.controls;
  }

  async ngOnInit() {
    this.reportForm = this.formBuilder.group({
        honap : ['',Validators.compose([Validators.required,Validators.pattern('[2]{1}[0]{1}[0-2]{1}[0-9]{1}-[0-1]{1}[0-9]{1}')])],
        auto : ['',Validators.required]
    });

    this.cars = await this.carService.getAll()
  }

  async getTrips()
  {
    this.trips = await this.tripService.getAllFiltered(this.reportForm.controls['honap'].value,this.reportForm.controls['auto'].value.id)
    this.private_trips = await this.tripService.getSpecifiedTrips(this.reportForm.controls['honap'].value,this.reportForm.controls['auto'].value.id,'Magán')
    this.corporate_trips = await this.tripService.getSpecifiedTrips(this.reportForm.controls['honap'].value,this.reportForm.controls['auto'].value.id,'Céges')
    this.startKm = this.trips[0].auto_kmallas - this.trips[0].megtett_tavolsag
    this.endKm = this.trips[this.trips.length-1].auto_kmallas
    this.auto = this.trips[0].auto
    this.getCalculate()
  }

  getCalculate()
  {
    this.private_cost.megtett_tavolsag = this.private_trips.reduce((a, b) =>  a + b.megtett_tavolsag, 0)
    this.private_cost.fogyasztas_ft = (this.private_cost.megtett_tavolsag/100) * this.auto.fogyasztas * 480
    this.private_cost.altalany_dij = this.private_cost.megtett_tavolsag*10
    this.private_cost.osszes_koltseg = this.private_cost.fogyasztas_ft+this.private_cost.altalany_dij

    this.corporate_cost.megtett_tavolsag = this.corporate_trips.reduce((a, b) =>  a + b.megtett_tavolsag, 0)
    this.corporate_cost.fogyasztas_ft = (this.corporate_cost.megtett_tavolsag/100) * this.auto.fogyasztas * 480
    this.corporate_cost.altalany_dij = this.corporate_cost.megtett_tavolsag*10
    this.corporate_cost.osszes_koltseg = this.corporate_cost.fogyasztas_ft+this.corporate_cost.altalany_dij
  }

}
