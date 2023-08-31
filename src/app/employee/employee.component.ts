import { Component, OnInit } from '@angular/core';
import { Employee } from './employee.model';
// import { ServiceService } from 'src/common/service.service';
import { Router } from '@angular/router';
// import { CommonService } from 'src/common/service.service';
import { DELETE_EMPLOYEE, EMPLOYEE_LIST } from 'src/auth';
import { ServiceService } from 'src/common/service.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employeeList: any;
  employee:Employee=new Employee();

  constructor(private route:Router,private common:ServiceService) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  addmore(){
    this.route.navigateByUrl('home/addemployee');
  }
  edit(id:Number){
    this.route.navigate(['home/editemployee/'+id])
  }
  view(id:Number){
    this.route.navigate(['home/viewemployee/'+id])
  }
  getEmployeeList(){
   this.common.httpGet(EMPLOYEE_LIST).subscribe((data)=>{
    if(data.errFlag){

    }
    else{
      this.employeeList = data.response;
    }
   })
  }
  onDelete(id:Number){
    this.common.httpGet(DELETE_EMPLOYEE+id).subscribe((data)=>{
      if(data.errFlag){
        alert("Deleted Unsucessfully");
      }
      else{
       alert("Sucessfully Deleted");
       this.getEmployeeList();
      }
    })
  }

}
