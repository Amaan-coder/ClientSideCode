import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/common/service.service';
import { ADD_EMPLOYEE, EMPLOYEE_DETAILS } from 'src/auth';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.scss']
})
export class EditemployeeComponent implements OnInit {

  id:any;
  employee:Employee=new Employee();
  employeeList: any=[];
  firstName = new FormControl('', [Validators.required, this.alphabetValidator]);
  lastName = new FormControl('', [Validators.required, this.alphabetValidator]);

  add1 = new FormControl("", Validators.required);
  add2 = new FormControl("", Validators.required);
  city = new FormControl('', [Validators.required, this.alphabetValidator]);
  state = new FormControl('', [Validators.required, this.alphabetValidator]);

  phone = new FormControl(null, [Validators.required, this.numericValidator]);

  email = new FormControl('', [Validators.required, Validators.email]);

  pin = new FormControl("", [Validators.required, this.numericValidator]);
  company = new FormControl('', [Validators.required, this.alphabetValidator]);

  constructor(private router:Router, private common:ServiceService, private route:ActivatedRoute,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.id =this.route.snapshot.params['id'];
    this.getEmployeeList(this.id);
  }
  onBack(){
    this.router.navigate(['/main/employeeList']);
  }
 getEmployeeList(id: any){
  this.common.httpGet(EMPLOYEE_DETAILS+id).subscribe((data)=>{
    if(data.errFlag){
      this.toastr.error("No data found");
    }
    else{
      this.employee = data.response;
    }
  })
 }
  onSubmit() {
    if (this.firstName.valid && this.lastName.valid && this.add1.valid && this.add2.valid && this.city.valid && this.state.valid && this.phone.valid && this.email.valid && this.pin.valid && this.company.valid) {
      this.common.httpPost(ADD_EMPLOYEE, this.employee).subscribe(data => {
        this.toastr.success("Employee Edited Successfully");
        this.router.navigate(['/main/employeeList']);
      })
    }
    else {
      this.toastr.warning("Please fill the mandatory fields or Invalid Fields");
      this.firstName.markAsTouched();
      this.firstName.markAsDirty();
      this.lastName.markAsDirty();
      this.lastName.markAsTouched();
      this.add1.markAsDirty();
      this.add1.markAsTouched();
      this.add2.markAsDirty();
      this.add2.markAsTouched();
      this.city.markAsDirty();
      this.city.markAsTouched();
      this.state.markAsDirty();
      this.state.markAsTouched();
      this.pin.markAsDirty();
      this.pin.markAsTouched();
      this.phone.markAsDirty();
      this.phone.markAsTouched();
      this.company.markAsDirty();
      this.company.markAsTouched();
      this.email.markAsDirty();
      this.email.markAsTouched();
    }
  }

numericValidator(control: AbstractControl): { [key: string]: any } | null {
  const valid = /^\d+$/.test(control.value);
  return valid ? null : { nonNumeric: true };
}
numberChange(event: Event) {
  const i = event.target as HTMLInputElement;
  let num = i.value;
  num = num.replace(/\D/g, '');
  num = num.slice(0, 10);
  i.value = num;
}

forAlphabetOnly(name: string): boolean {
  const pattern = /^[a-zA-Z\s]*$/;
  return pattern.test(name);
}

alphabetValidator(control: FormControl): { [key: string]: any } | null {
  const alphabeticCharacters = /^[a-zA-Z\s]*$/; // Allow alphabetic characters and spaces
  if (control.value && !alphabeticCharacters.test(control.value)) {
    return { invalidAlphabet: true };
  }
  return null;
}

}
