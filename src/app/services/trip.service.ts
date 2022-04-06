import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) { }

  async addTrip(trip : Trip) {    
    return await lastValueFrom(this.http.post<Trip>('/api/trips' , trip));
  }

  async getAllTrips() {
    return await lastValueFrom(this.http.get<Trip[]>('/api/trips'));
  }

  async getTripByID(id : any) {
    return await lastValueFrom(this.http.get<Trip>('/api/trips/' + id));
  }

  async getAllFiltered(datum : string, rendszam : any)
  {
    return await lastValueFrom(this.http.get<Trip[]>('/api/trips_filter', {
      params : {datum,rendszam}
    }));
  }

  async getSpecifiedTrips(datum : string, rendszam : any, type : any)
  {
    return await lastValueFrom(this.http.get<Trip[]>('/api/trips_specific_trip', {
      params : {datum,rendszam,type}
    }));
  }

  async getAllWhereDateLowerThan(datum : string, rendszam : any)
  {
    return await lastValueFrom(this.http.get<Trip[]>('/api/trips_lowerDate_trip', {
      params : {datum,rendszam}
    }));
  }

  async getAllWhereDateGreaterThan(datum : string, rendszam : any)
  {
    return await lastValueFrom(this.http.get<Trip[]>('/api/trips_greaterDate_trip', {
      params : {datum,rendszam}
    }));
  }

}
