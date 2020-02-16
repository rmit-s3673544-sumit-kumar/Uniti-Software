import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoundViewComponent } from './round-view.component';

const routes: Routes = [
  {
    path: '',
    component: RoundViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoundViewRoutingModule { }
