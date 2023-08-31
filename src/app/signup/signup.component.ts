import { Component, OnInit } from '@angular/core';
import { Signup } from './signup.model';
import { Router } from '@angular/router';
import { ServiceService } from 'src/common/service.service';
import { SIGNUP } from 'src/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user : Signup = new Signup();
  constructor(private router:Router, private common : ServiceService,private toastr : ToastrService) { }

  ngOnInit(): void {
  }
  signup(){
    
    this.common.httpPost(SIGNUP,this.user).subscribe({
      next : data=>{
        this.toastr.success(data.response,"Signup Successfully");
        this.router.navigate(['login']);
      },
      error : error=>{
        this.toastr.error(error.error.message,"Signup Failed");
      }
    }
    )
  }
}
