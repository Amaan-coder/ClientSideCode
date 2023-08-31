import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { EditemployeeComponent } from './editemployee/editemployee.component';
import { ViewemployeeComponent } from './viewemployee/viewemployee.component';
import { EmployeeComponent } from './employee.component';

const routes: Routes = [
  {
    path:'',component:EmployeeComponent
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
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
