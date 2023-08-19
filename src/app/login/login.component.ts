import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Signup } from '../signup/signup.model';
import { ServiceService } from 'src/common/service.service';
import { LOGIN } from 'src/auth';
import { ResponseDto } from 'src/common/common-model';

import { HttpErrorResponse } from '@angular/common/http';
import { Observer } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: Signup = new Signup();
  msg: string='';
  constructor(private route : Router, private common: ServiceService) { }

  ngOnInit(): void {
  }


  onSubmit() {
    this.common.httpPost(LOGIN, this.user).subscribe( {
      next: data => {
        
        if(data.response[0].role[0].role=="admin"){
          this.common.showMessage("Admin Login Successfully",true);
          this.route.navigate(['employeeList']);
        }
        if(data.response[0].role[0].role=="user"){
          this.common.showMessage("User Login Successfully",true);
          this.route.navigate(['employeeList']);
        }
         
          this.route.navigate(['employeeList']);
         },
      error: error => {
       this.common.showMessage(error.error.message,false);
        if (error instanceof HttpErrorResponse) {
        
        }
      }
    } as Observer<ResponseDto>);
  }
  
  
}
