import { Component, OnInit } from '@angular/core';
import { Signup } from './signup.model';
import { Router } from '@angular/router';
import { ServiceService } from 'src/common/service.service';
import { SIGNUP } from 'src/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user : Signup = new Signup();
  constructor(private router:Router, private common : ServiceService) { }

  ngOnInit(): void {
  }
  signup(){
    console.log("User Data=>",this.user);
    
    this.common.httpPost(SIGNUP,this.user).subscribe((data)=>{
      if(data.errFlag){
        alert(String(data.message));
      }
      else{
        alert(String(data.response));
      }
    })
  }
}
