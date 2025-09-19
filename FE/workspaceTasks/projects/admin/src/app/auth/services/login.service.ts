import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../context/DTOs';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

login(data: Login) {
  // const url = environment.authApi.replace('tasks', 'auth') + '/login';
  // console.log('Login API URL:', environment.authApi);
  return this.http.post('https://angular-nodejs-tasksproject.onrender.com/auth/login', data);
  // return this.http.post(environment.authApi +'/login', data);


}


}
