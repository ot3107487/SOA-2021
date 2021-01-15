import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {
  @Input() practitioner: { reference: string, display: string };
  @Input() patients;
  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  patientsSelect;
  start;
  end;
  selectedPatient;
  appointment: {
    resourceType: string;
    practitioner: {
      reference: string,
      display: string
    },
    subject: {
      reference: string,
      display: string
    },
    start: string,
    end: string
  };
  constructor() { }

  ngOnInit(): void {
    this.appointment = {
      resourceType: 'Appointment',
      practitioner: this.practitioner,
      subject: {
        reference: '',
        display: ''
      },
      start: '',
      end: ''
    }

    this.patientsSelect = this.patients.map(p => ({ label: p.name, value: { reference: `${p.resourceType}/${p.id}`, display: p.name } }));
  }

  save() {
    this.appointment.subject = this.selectedPatient;
    this.appointment.start = new Date(this.start).toISOString();
    this.appointment.end = new Date(this.end).toISOString();
    this.add.emit(this.appointment);
  }

  cancel() {
    this.close.emit();
  }

}
