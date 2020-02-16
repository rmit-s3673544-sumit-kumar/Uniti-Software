import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitViewComponent } from './visit-view.component';

const routes: Routes = [
  {
    path: '',
    component: VisitViewComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitViewRoutingModule { }
