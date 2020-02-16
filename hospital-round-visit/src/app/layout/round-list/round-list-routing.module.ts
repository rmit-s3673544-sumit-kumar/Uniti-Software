import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoundListComponent} from './round-list.component';
const routes: Routes = [
  {
    path: '',
    component: RoundListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoundListRoutingModule { }
