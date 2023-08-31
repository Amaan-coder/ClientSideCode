import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { AddemployeeComponent } from './employee/addemployee/addemployee.component';
import { EditemployeeComponent } from './employee/editemployee/editemployee.component';
import { ViewemployeeComponent } from './employee/viewemployee/viewemployee.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserlistComponent } from './userlist/userlist.component';
import { GuardGuard } from './config/guard.guard';

const routes: Routes = [
  {
   path:'',redirectTo:"login",pathMatch:'full' 
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'signup',component:SignupComponent
  },
  {
    path:'home',component:HomeComponent,
    canActivate:[GuardGuard]
  },
  {
    path:'employeeList',component:EmployeeComponent
  },
  
  {
    path:'addemployee',component:AddemployeeComponent
  },
  {
    path:'editemployee/:id',component:EditemployeeComponent
  },
  {
    path:'viewemployee/:id',component:ViewemployeeComponent
  },
 
  {
    path:'userlist',component:UserlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
