import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitViewRoutingModule } from './visit-view-routing.module';
import { VisitViewComponent } from './visit-view.component';

import { ConfigService } from './../../shared/services/config-service';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule,MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [VisitViewComponent],
  imports: [
    CommonModule,
    VisitViewRoutingModule,
    MatButtonModule, MatCardModule, MatIconModule, MatTableModule,MatSelectModule 
  ],
  providers:[ConfigService]
})
export class VisitViewModule { }
