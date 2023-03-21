import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/services/security/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
  }

  toLogin(): void {
    this.securityService.login();
  }
}
