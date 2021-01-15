import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ButtonModule } from 'primeng/button';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AppointmentService } from './services/appointment.service';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { StaticDataService } from './services/static-data.service';
import { CalendarModule } from 'primeng/calendar';
import { LocationStatusComponent } from './components/location-status/location-status.component';
import { KnobModule } from 'primeng/knob';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { WsService } from './services/ws.service';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin
]);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddAppointmentComponent,
    DashboardComponent,
    LocationStatusComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FullCalendarModule,
    HttpClientModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
    KnobModule,
    AvatarModule,
    AvatarGroupModule
  ],
  providers: [WsService, StaticDataService, AppointmentService, AuthService, AuthGuardService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
