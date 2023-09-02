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
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: Signup = new Signup();
  msg: string='';
  constructor(private route : Router, private common: ServiceService,private toastr : ToastrService) { }

  ngOnInit(): void {}

  onSubmit1() {
    this.toastr.success('Hello Wordl ', 'for fun');
  }
  onSubmit() {
    this.common.httpPost(LOGIN, this.user).subscribe({
      next: (data) => {
        this.toastr.success(data.response.role[0].roleDes, 'Login Sucessfully');
        this.common.setLoggedIn(); //For login

        const role = data.response.role[0].role;
        this.common.setRoles(role); //  For getting roles
        this.route.navigate(['main']);
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Login Failed');
        // if (error instanceof HttpErrorResponse) {

        // }
      },
    } as Observer<ResponseDto>);
  }
}
