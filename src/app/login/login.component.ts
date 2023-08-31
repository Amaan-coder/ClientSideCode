import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Signup } from '../signup/signup.model';
import { ServiceService } from 'src/common/service.service';
import { LOGIN } from 'src/auth';
import { ResponseDto } from 'src/common/common-model';

import { HttpErrorResponse } from '@angular/common/http';
import { Observer } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: Signup = new Signup();
  msg: string='';
  constructor(private route : Router, private common: ServiceService,private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit1(){
    this.toastr.success("Hello Wordl ","for fun")
  }
  onSubmit() {
    this.common.httpPost(LOGIN, this.user).subscribe( {
      next: data => {
        
        // if(data.response.role[0].role=="admin"){
        //   this.common.showMessage("Admin Login Successfully",true);
        //   this.route.navigate(['home']);
        // }
        // if(data.response.role[0].role=="user"){
        //   this.common.showMessage("User Login Successfully",true);
        //   this.route.navigate(['home']);
        // }
        this.toastr.success(data.response.role[0].roleDes,"Login Sucessfully")
        this.route.navigate(['home']);
         },
      error: error => {
       this.toastr.error(error.error.message,"Login Failed",);
        // if (error instanceof HttpErrorResponse) {
        
        // }
      }
    } as Observer<ResponseDto>);
  }
  
  
}
