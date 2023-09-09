import { Component, OnInit } from '@angular/core';
import { Signup } from './signup.model';
import { Router } from '@angular/router';
import { ServiceService } from 'src/common/service.service';
import { SIGNUP } from 'src/auth';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user : Signup = new Signup();
  name = new FormControl("",[Validators.required, this.alphabetValidator]);
  email = new FormControl("",[Validators.required,Validators.email]);
  password = new FormControl("",Validators.required);
  confirm = new FormControl("",Validators.required);

  constructor(private router:Router, private common : ServiceService,private toastr : ToastrService) { }

  ngOnInit(): void {
  }
  signup(){ 
    if(this.email.valid && this.password.valid &&this.name.valid && this.password.valid && this.confirm.valid){
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
    else{
      this.email.markAsDirty();
      this.email.markAsTouched();
      this.password.markAsDirty();
      this.password.markAsTouched();
      this.confirm.markAsDirty();
      this.confirm.markAsTouched();
      this.name.markAsTouched();
      this.name.markAsTouched();
      this.toastr.warning("","Something went wrong");
    }
    
  }

  alphabetValidator(control: FormControl): { [key: string]: any } | null {
    const alphabeticCharacters = /^[a-zA-Z\s]*$/; // Allow alphabetic characters and spaces
    if (control.value && !alphabeticCharacters.test(control.value)) {
      return { invalidAlphabet: true };
    }
    return null;
  }
}
