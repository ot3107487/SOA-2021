import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
@Injectable({
  providedIn: 'root'
})
export class WsService {
  appointments = new Subject<any>();
  constructor() {
    const subject = webSocket("ws://localhost:8080");
    subject.subscribe(
      msg => this.appointments.next(msg), // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }

  getAppointments() {
    return this.appointments;
  }
}
