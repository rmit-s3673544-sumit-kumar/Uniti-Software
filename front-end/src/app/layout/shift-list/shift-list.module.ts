import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftListRoutingModule } from './shift-list-routing.module';
import { ShiftListComponent } from './shift-list.component'; 
import {MatExpansionModule} from '@angular/material/expansion';
import { ConfigService } from './../../shared/services/config-service';
import {MatSortModule} from '@angular/material/sort';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule,MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [ShiftListComponent],
  imports: [
    CommonModule,
    ShiftListRoutingModule,
    MatExpansionModule,
    MatSortModule,
    MatButtonModule, MatCardModule, MatIconModule, MatTableModule,MatSelectModule
  ],
  providers:[ConfigService]
  
})
export class ShiftListModule { }
