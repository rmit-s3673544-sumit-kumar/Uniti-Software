import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoundEditComponent } from './round-edit.component'
const routes: Routes = [
  {
    path: '',
    component: RoundEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoundEditRoutingModule { }
