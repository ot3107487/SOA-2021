import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { routes } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(routes.appointment);
  }

  save(appointment) {
    return this.http.post(routes.appointment, appointment);
  }
}
