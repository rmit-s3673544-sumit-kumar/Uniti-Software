import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoundListRoutingModule } from './round-list-routing.module';
import { RoundListComponent } from './round-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ConfigService } from './../../shared/services/config-service';
import {MatSortModule} from '@angular/material/sort';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule,MatSelectModule,MatPaginatorModule } from '@angular/material';
@NgModule({
  declarations: [RoundListComponent],
  imports: [
    CommonModule,
    RoundListRoutingModule,
    MatExpansionModule,
    MatSortModule,
    MatButtonModule, MatCardModule, MatIconModule, MatTableModule,MatSelectModule,MatPaginatorModule
  ],
  providers:[ConfigService]
})
export class RoundListModule { }
