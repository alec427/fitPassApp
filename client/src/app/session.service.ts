import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { GLOBAL } from './global'


@Injectable()
export class SessionService {
  public url: string
  public urlApi: string
  constructor(private http: Http) {
    this.url= GLOBAL.url
    this.urlApi=GLOBAL.urlApi
   }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user) {
    console.log(user)
    return this.http.post(this.url+`/signup`, user)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError));
  }

  login(user) {
    return this.http.post(this.url+`/login`, user)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError));
  }

  logout() {
    return this.http.post(this.url+`/logout`, {})
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError));
  }

  isLoggedIn() {
    return this.http.get(this.url+`/loggedin`)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError));
  }
  exist(email){
    console.log('peticion: ',this.urlApi+email)
    return this.http.get(this.urlApi+email)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError));
  }

  findOne(){
    return this.http.get(this.url+`/findOne`)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError));
  }
}
