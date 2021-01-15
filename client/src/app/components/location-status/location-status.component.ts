import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-location-status',
  templateUrl: './location-status.component.html',
  styleUrls: ['./location-status.component.scss']
})
export class LocationStatusComponent implements OnInit, OnChanges, OnDestroy {
  @Input() appointment;
  @Input() practitioner;
  @Input() userPhotoUrl;
  classApp;
  status = '';
  description = '';
  knobInterval;
  appDuration = 150;
  timeleft = 23;
  constructor() { }

  ngOnInit(): void {
    this.update();
  }

  update() {
    if (!this.appointment) {
      this.classApp = { background: 'rgb(0, 51, 153)' };
      this.status = 'No appointments in progress';
    } else {
      this.classApp = { background: 'rgb(0, 153, 51)' };
      this.status = "Current appointment:"
      this.description =
        `From: ${this.appointment.start.toLocaleString()}\n\n\nTo: ${this.appointment.end.toLocaleString()}\n\n\nPractitioner: ${this.appointment.practitioner.display}\n\n\nPatient: ${this.appointment.subject.display}`
      const diffMs = this.appointment.end.getTime() - this.appointment.start.getTime();
      this.appDuration = Math.round(diffMs / 1000 / 60);
      this.updateDTimeLeft();
      this.knobInterval = setInterval(() => this.updateDTimeLeft(),60000);
    }
  }

  updateDTimeLeft() {
    const now: any = new Date();
    const diffMs = this.appointment.end.getTime() - now.getTime();
    this.timeleft = this.appDuration - Math.round(diffMs / 1000 /60);
    // this.timeleft = Math.round(diffMs / 1000 /60);
    if (this.timeleft === 0) {
      this.appointment = null;
      clearInterval(this.knobInterval);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.appointment) {
      this.appointment = changes.appointment.currentValue;
      this.update();
    }

  }

  ngOnDestroy() {
    if (this.knobInterval) clearInterval(this.knobInterval);
  }

}
