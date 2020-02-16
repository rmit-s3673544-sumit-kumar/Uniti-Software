import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShiftListComponent } from './shift-list.component'
const routes: Routes = [
  {
    path: '',
    component: ShiftListComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftListRoutingModule { }
