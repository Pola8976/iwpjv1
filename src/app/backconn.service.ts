import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { templateJitUrl } from '@angular/compiler';
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
  
  headers = new HttpHeaders({'Content-Type':  'application/json'});

  postNewCustomer(reqBody: string): Observable<any> {
    return this.http.post(this.rootUrl + '/new-customer', reqBody, {headers: this.headers});
  }
}
