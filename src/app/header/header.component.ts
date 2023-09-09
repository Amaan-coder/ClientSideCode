import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/common/service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  roles: any;
  adminRole: boolean = false;
  constructor(public commService: ServiceService, private route: Router) {}
  

  ngOnInit(): void {
    
  }
  

  logout() {
    this.commService.setLoggedOut();
    this.commService.removeRole();
    this.commService.removeName();
    this.route.navigate(['/login']);
  }
}
