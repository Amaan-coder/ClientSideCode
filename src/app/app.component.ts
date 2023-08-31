import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/common/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(public commService: ServiceService,private route:Router){}
  ngOnInit(): void {
    
  }
  title = 'ClientSideCode';
  login(){
    this.route.navigate(['/login']);
  }
}
