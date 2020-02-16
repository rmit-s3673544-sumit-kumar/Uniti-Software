import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { LayoutComponent } from './layout.component';
  
const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard'
            }, 
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'addemployee',
                loadChildren: './employee-add/employee-add.module#EmployeeAddModule'
            },
            {
                path: 'employee-list',
                loadChildren: './employee-list/employee-list.module#EmployeeListModule'
            },
            {
                path: 'employee-edit/:id',
                loadChildren: './employee-edit/employee-edit.module#EmployeeEditModule'
            },
            {
                path: 'employee-profile',
                loadChildren: './employee-profile/employee-profile.module#EmployeeProfileModule'
            },
            {
                path: 'round-add',
                loadChildren: './round-add/round-add.module#RoundAddModule'
            },  
            {
                path: 'round-list',
                loadChildren: './round-list/round-list.module#RoundListModule'
            },
            {
                path: 'round-view',
                loadChildren: './round-view/round-view.module#RoundViewModule'
            }, {
                path: 'round-edit',
                loadChildren: './round-edit/round-edit.module#RoundEditModule'
            },
            {
                path: 'visit-view',
                loadChildren: './visit-view/visit-view.module#VisitViewModule'
            }, 
            {
                path: 'my-shift',
                loadChildren: './my-shift/my-shift.module#MyShiftModule'
            }, 
            {
                path: 'shift-list',
                loadChildren: './shift-list/shift-list.module#ShiftListModule'
            },
            {
                path: 'leave',
                loadChildren: './leave/leave.module#LeaveModule'
            } 
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
