import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { routes } from '../constants';
import { tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: {user:string, password:string}) {
    return this.http.post(routes.login,credentials).pipe(
      tap((res:any) => localStorage.setItem('token', res.token))
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
