import { Component, OnInit } from '@angular/core';
import { USER_LIST } from 'src/auth';
import { ServiceService } from 'src/common/service.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  roleList:any=[];
  userList:any=[];
  currentPage: number = 1;
  itemsPerPage: number = 5; 
  constructor(private common:ServiceService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(){
   
    this.common.httpGet(USER_LIST).subscribe((data)=>{
    
      this.userList = data.response;
      this.roleList = data.response.role;
    })
  }
  onPageChange(page: number) {
    this.currentPage = page;
  }

  get paginatedEmployeeList() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.userList.slice(startIndex, endIndex);
  } 
}
