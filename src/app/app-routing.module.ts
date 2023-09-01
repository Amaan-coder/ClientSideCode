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
import { MainComponent } from './main/main.component';

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
    canActivate:[GuardGuard],
    children:[
      
      {
        path:'main',component:MainComponent
      },
      {
        path:'',redirectTo:"main",pathMatch:"full"
      },
     
      {
        path:'employeeList',loadChildren:()=>import('./employee/employee.module').then(m=>m.EmployeeModule)
      },
      
      
      {
        path:'userlist',component:UserlistComponent
      }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
