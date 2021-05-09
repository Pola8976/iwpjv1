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

  headers: HttpHeaders;

  genHeaders(): void {
    this.headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }

  signup(reqBody: string): Observable<any> {
    this.genHeaders();
    return this.http.post(this.rootUrl + '/signup', reqBody, {headers: this.headers});
  }

  login(reqBody: string): Observable<any> {
    this.genHeaders();
    return this.http.post(this.rootUrl + '/login', reqBody, {headers: this.headers});
  }

  sellerSignup(reqBody: string): Observable<any> {
    this.genHeaders();
    return this.http.post(this.rootUrl + '/seller/signup', reqBody, {headers: this.headers});
  }

  sellersLogin(reqBody: string): Observable<any> {
    this.genHeaders();
    return this.http.post(this.rootUrl + '/seller/login', reqBody, {headers: this.headers});
  }

  fetchCategories(): Observable<any> {
    this.genHeaders();
    return this.http.get(this.rootUrl + '/categories');
  }

  productCreate(reqBody: string): Observable<any> {
    this.genHeaders();
    return this.http.post(this.rootUrl + '/seller/create', reqBody, {headers: this.headers});
  }

  productFetch(reqBody: string): Observable<any> {
    this.genHeaders();
    return this.http.post(this.rootUrl + '/seller/products', reqBody, {headers: this.headers});
  }
}
