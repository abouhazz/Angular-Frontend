import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });

    return next.handle(authRequest);
  }
}