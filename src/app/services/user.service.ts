import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  async getAll() {
    return await lastValueFrom(this.http.get<User[]>('/api/users'));
  }

  async addUser(user : User) {    
    return await lastValueFrom(this.http.post<User>('/api/users' , user));
  }

  async deleteUser(id : number) {
    return await lastValueFrom(this.http.delete<User>('/api/users/' + id))
  }

  
  async getUserByID(id : any) {
    return  await lastValueFrom(this.http.get<User>('/api/users/' + id));
  }
}
