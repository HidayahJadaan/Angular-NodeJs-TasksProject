import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const newRequest = request.clone({
      // url:'http://localhost:4200/test'
      headers : request.headers.append('Authorization', `Bearer ` + localStorage.getItem('token'))
    })



    // request.headers = newRequest.headers.append('Authorization', `Bearer ` + localStorage.getItem('token'));

    return next.handle(newRequest);
  }


}
