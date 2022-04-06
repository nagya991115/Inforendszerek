import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  async getOneUser(username: string, password: string) {
    return lastValueFrom(this.http.get<string>('/api/user', {
      params: {username: username, password: password}
    }));
  }

  async authenticateUser(username: string, password: string) {
    const roleNum = await this.getOneUser(username, password);
    if(roleNum != undefined)
    {
    sessionStorage.setItem('name', username);
    sessionStorage.setItem('role', roleNum);
      return true;
    }
    return false;
  }

  clearSessionStorage() {
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('role');
  }


}
