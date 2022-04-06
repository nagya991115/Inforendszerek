import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Driver } from '../models/driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }


  async getAll() {
    return await lastValueFrom(this.http.get<Driver[]>('/api/driver'));
  }

  async addDriver(driver : Driver) {
    return await lastValueFrom(this.http.post<Driver>('/api/driver' , driver));
  }

  async getDriverByID(id : any) {
    return await lastValueFrom(this.http.get<Driver>('/api/driver/' + id));
  }

  async filterDriver(search: string) {
    return await lastValueFrom(this.http.get<Driver[]>('/api/driver', {
      params: { search }
    }));
  }

  async getOkLicense(search : string) {
    return await lastValueFrom(this.http.get<Driver[]>('/api/driver_okLicense', { params : {search}}));
  }
}
