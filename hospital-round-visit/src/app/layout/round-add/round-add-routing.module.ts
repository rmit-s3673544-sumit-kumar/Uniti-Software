import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoundAddComponent } from './round-add.component';

const routes: Routes = [
  {
    path: '',
    component: RoundAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoundAddRoutingModule { }
