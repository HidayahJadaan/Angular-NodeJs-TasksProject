import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateAccount } from '../context/DTOs';
import { environment } from 'projects/user/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }


  createUser(model:CreateAccount){

    return this.http.post(environment.baseApi + '/auth/createAccount', model)
  }


}
