import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user:string;
  pass: string;
  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    const credentials = {user: this.user, password: this.pass};
    this.auth.login(credentials).subscribe((response: any) => {
      this.router.navigate(['']);
    })
  }

}
