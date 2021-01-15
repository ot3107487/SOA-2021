import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { AppointmentService } from 'src/app/services/appointment.service';
import { StaticDataService } from 'src/app/services/static-data.service';
import { WsService } from 'src/app/services/ws.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('calendar') calendar;
  appointment;
  practitioner: any = {};
  userPhotoUrl;
  patients = [];
  events: any[] = [];
  showAddAppointment = false;
  selectedEvent;
  options: CalendarOptions = {
    initialView: 'timeGridWeek',
    dateClick: this.handle.bind(this), // bind is important!
    events: this.events,
    height: '100%',
    allDaySlot: false,
    headerToolbar: {
      left:   'title',
      center: '',
      right:  'prev,next'
    },
    nowIndicator: true,
    firstDay: 1
  }
  constructor(private appointmentService: AppointmentService,
    private staticDataService: StaticDataService,
    private ws: WsService) { }

  ngOnInit() {
    this.staticDataService.getUserInfo().subscribe((p: any) => {
      this.practitioner.reference = `${p.resourceType}/${p.id}`;
      this.practitioner.display = p.name;
      this.userPhotoUrl = p.photo;
    });

    this.appointmentService.get().subscribe((bundle: any) => {
      this.events.push(...bundle.entry.map(e => {
        e.resource.start = new Date(e.resource.start);
        e.resource.end = new Date(e.resource.end);
        e.resource.title = `${e.resource.subject.display} Dr.${e.resource.practitioner.display}`;
        this.calendar.calendar.addEvent(e.resource);
        return e.resource;
      }));
      const now = new Date();
      this.appointment = this.events.find(app => app.start < now && app.end > now );
    });

    this.staticDataService.getPatients().subscribe((bundle: any) => {
      this.patients = bundle.entry.map(e => e.resource);
    });

    this.ws.getAppointments().subscribe(app => {
      app.start = new Date(app.start);
      app.end = new Date(app.end);
      app.title = `${app.subject.display} Dr.${app.practitioner.display}`;
      this.events.push(app);
      this.calendar.calendar.addEvent(app);
      const now = new Date();
      this.appointment = this.events.find(app => app.start < now && app.end > now );
    });

  }

  handle(d) {
    this.selectedEvent = d;
    this.showAddAppointment = true;
  }

  add(appointment) {
    this.appointmentService.save(appointment).subscribe((app: any) => {
      this.showAddAppointment = false;
      console.log(app);
    })
  }


}
