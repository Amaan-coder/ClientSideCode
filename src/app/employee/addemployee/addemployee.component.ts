import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee.model';
import { ServiceService } from 'src/common/service.service';
import { EmployeeComponent } from '../employee.component';
import { ADD_EMPLOYEE } from 'src/auth';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.scss']
})
export class AddemployeeComponent implements OnInit {

  constructor(private router:Router, private common:ServiceService) { }
  employeeList: any;
  id:any;
  employee: Employee = new Employee();
  ngOnInit(): void {
   
  }
  onBack(){
    this.router.navigate(['../']);
  }

 
  onSubmit(){
    this.common.httpPost(ADD_EMPLOYEE,this.employee).subscribe(data=>{
      alert("Data Added Successfully");
      this.router.navigate(['employeeList']);
    })

  }
}
