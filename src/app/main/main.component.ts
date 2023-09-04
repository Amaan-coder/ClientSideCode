import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/common/service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private common:ServiceService) { }

  ngOnInit(): void {
  }

}
