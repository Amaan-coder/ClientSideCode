import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/common/service.service';
import { EMPLOYEE_DETAILS } from 'src/auth';

@Component({
  selector: 'app-viewemployee',
  templateUrl: './viewemployee.component.html',
  styleUrls: ['./viewemployee.component.scss']
})
export class ViewemployeeComponent implements OnInit {

  id:any;
  employee:Employee=new Employee();
  employeeList: any=[];
  constructor(private router:Router, private common:ServiceService, private route:ActivatedRoute) { }

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
        alert("No data Found");
      }
      else{
        this.employeeList = data.response;
      }
    })
   }

}
