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
  constructor(private common:ServiceService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(){
   
    this.common.httpGet(USER_LIST).subscribe((data)=>{
      console.log("UserList",this.userList);
      this.userList = data.response;
      this.roleList = data.response.role;
    })
  }
}
