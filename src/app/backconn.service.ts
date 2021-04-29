import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { templateJitUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class BackconnService {

  readonly rootUrl = 'http://localhost:3000/api';

  temp: any;

  constructor(
    private http: HttpClient,
  ) { }

  getTest() {
    return this.http.get(this.rootUrl + '/test');
  }
}
