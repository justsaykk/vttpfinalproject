import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout-mock',
  templateUrl: './logout-mock.component.html',
  styleUrls: ['./logout-mock.component.css']
})
export class LogoutMockComponent implements OnInit {

  constructor(private authSvc: AuthService, private router:Router) {}

  ngOnInit(): void {
      this.authSvc.logout()
      this.router.navigate(["/"])
  }
}
