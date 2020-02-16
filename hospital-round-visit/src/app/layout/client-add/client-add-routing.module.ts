import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientAddComponent } from './client-add.component'
const routes: Routes = [{
  path: '',
  component: ClientAddComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientAddRoutingModule { }
