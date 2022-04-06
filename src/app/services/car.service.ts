import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  
  constructor(private http: HttpClient) { }

  async getAll() {
    return await lastValueFrom(this.http.get<Car[]>('/api/car'));
  }

  async addCar(car : Car) {    
    return await lastValueFrom(this.http.post<Car>('/api/car' , car));
  }

  async getCarByID(id : any) {
    return  await lastValueFrom(this.http.get<Car>('/api/car/' + id));
  }

  async filterCar(search: string) {
    return await lastValueFrom(this.http.get<Car[]>('/api/car', {
    params: { search }
  }));
  }
}
