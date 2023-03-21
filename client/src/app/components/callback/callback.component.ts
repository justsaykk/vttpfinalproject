import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security/security.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router:Router, private securityService: SecurityService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.securityService.fetchToken(params['code'], params['state']).subscribe(data => {
        this.securityService.updateToken(data.accessToken);
        this.router.navigate(['/home']);
      })
    })
  }

}
