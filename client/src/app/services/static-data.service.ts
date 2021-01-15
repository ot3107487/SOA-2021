import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { routes } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {

  constructor(private http: HttpClient) { }

  getPractitioners() {
    return this.http.get(routes.practitioner);
  }

  getPatients() {
    return this.http.get(routes.patient);
  }

  getUserInfo() {
    return this.http.get(routes.userInfo);
  }
}
