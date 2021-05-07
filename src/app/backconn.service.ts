import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { templateJitUrl } from '@angular/compiler';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BackconnService {

  readonly rootUrl = 'http://localhost:3000/api';

  temp: any;

  constructor(
    private http: HttpClient,
  ) { }

  getTest(): Observable<any> {
    return this.http.get(this.rootUrl + '/test');
  }

  headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  signup(reqBody: string): Observable<any> {
    return this.http.post(this.rootUrl + '/signup', reqBody, {headers: this.headers});
  }

  login(reqBody: string): Observable<any> {
    return this.http.post(this.rootUrl + '/login', reqBody, {headers: this.headers});
  }

  sellerSignup(reqBody: string): Observable<any> {
    return this.http.post(this.rootUrl + '/seller/signup', reqBody, {headers: this.headers});
  }

  sellersLogin(reqBody: string): Observable<any> {
    return this.http.post(this.rootUrl + '/seller/login', reqBody, {headers: this.headers});
  }
}
