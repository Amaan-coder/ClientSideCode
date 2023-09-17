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
  employeeList: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5; // Number of items to display per page
 
  employee:Employee=new Employee();

  constructor(private route:Router,public common:ServiceService) { }

  ngOnInit(): void {
    this.getEmployeeList();
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
        confirm("Are you sure");
      }
      else{
       alert("Sucessfully Deleted");
       this.getEmployeeList();
      }
    })
  }
  onPageChange(page: number) {
    this.currentPage = page;
  }

  get paginatedEmployeeList() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.employeeList.slice(startIndex, endIndex);
  } 
}
