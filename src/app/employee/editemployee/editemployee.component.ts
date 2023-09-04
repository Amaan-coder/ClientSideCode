import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/common/service.service';
import { ADD_EMPLOYEE, EMPLOYEE_DETAILS } from 'src/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.scss']
})
export class EditemployeeComponent implements OnInit {

  id:any;
  employee:Employee=new Employee();
  employeeList: any=[];
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
 onSubmit(){
  this.common.httpPost(ADD_EMPLOYEE,this.employee).subscribe(data=>{
    this.toastr.success("Employee Edited Successfully");
    this.router.navigate(['/main/employeeList']);
  })

}
}
