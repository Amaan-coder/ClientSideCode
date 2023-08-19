import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/common/service.service';
import { ADD_EMPLOYEE, EMPLOYEE_DETAILS } from 'src/auth';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.scss']
})
export class EditemployeeComponent implements OnInit {

  id:any;
  employee:Employee=new Employee();
  employeeList: any=[];
  constructor(private router:Router, private common:ServiceService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id =this.route.snapshot.params['id'];
    this.getEmployeeList(this.id);
  }
  onBack(){
    this.router.navigate(['/employeeList']);
  }
 getEmployeeList(id: any){
  this.common.httpGet(EMPLOYEE_DETAILS+id).subscribe((data)=>{
    if(data.errFlag){
      alert("No data foubd");
    }
    else{
      this.employee = data.response;
    }
  })
 }
 onSubmit(){
  this.common.httpPost(ADD_EMPLOYEE,this.employee).subscribe(data=>{
    alert("Data Edited Successfully");
    this.router.navigate(['employeeList']);
  })

}
}
