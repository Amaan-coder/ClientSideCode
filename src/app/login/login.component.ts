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
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: Signup = new Signup();
  msg: string = '';
  role: any;

  email= new FormControl("",[Validators.required,Validators.email])
  password = new FormControl("",Validators.required);
  name: any;

  constructor(private route : Router, private common: ServiceService,private toastr : ToastrService) { }

  ngOnInit(): void {}

  onSubmit1() {
    this.toastr.success('Hello Wordl ', 'for fun');
  }
  onSubmit() {
    if(this.email.valid && this.password.valid){
      this.common.httpPost(LOGIN, this.user).subscribe({
        next: (data) => {
          this.toastr.success(data.response.role[0].roleDes, 'Login Sucessfully');
          this.common.setLoggedIn(); //For login
          this.name = data.response.fullName;
          this.role = data.response.role[0].role;
          this.common.setRole(this.role);
          this.common.setName(this.name);
          this.route.navigate(['main']);
        },
        error: (error) => {
          this.toastr.error(error.error.message, 'Something went wrong');
          // if (error instanceof HttpErrorResponse) { }
        },
      } as Observer<ResponseDto>);
    }
    else{
      this.email.markAsDirty();
      this.email.markAsTouched();
      this.password.markAsDirty();
      this.password.markAsTouched();
      this.toastr.warning("Fields must be filled","Warning");
    }
    
  }
}
