import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/common/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(public commService: ServiceService){}
  ngOnInit(): void {
    
  }
  title = 'ClientSideCode';
}
