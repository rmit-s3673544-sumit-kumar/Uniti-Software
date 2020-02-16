import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientListRoutingModule } from './client-list-routing.module';
import { ClientListComponent } from './client-list.component';
import { ConfigService } from './../../shared/services/config-service'
 
import { MatFormFieldModule,MatInputModule, MatPaginatorModule } from '@angular/material'; 

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule,MatSelectModule,MatSortModule  } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';  

@NgModule({
  declarations: [ClientListComponent],
  imports: [
    CommonModule,
    ClientListRoutingModule,
    FlexLayoutModule,
    MatButtonModule, MatCardModule, MatIconModule, MatTableModule,
    MatGridListModule,MatSortModule,
    MatFormFieldModule,MatInputModule, MatPaginatorModule ,MatDialogModule,MatSelectModule,ReactiveFormsModule
  ],
  providers:[ConfigService]
})
export class ClientListModule { }
