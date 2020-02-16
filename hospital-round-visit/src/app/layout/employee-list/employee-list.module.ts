import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeListRoutingModule } from './employee-list-routing.module';
import { EmployeeListComponent,dialogBoxComponent } from './employee-list.component';
import { ConfigService } from './../../shared/services/config-service'
 
import { MatFormFieldModule,MatInputModule, MatPaginatorModule } from '@angular/material';
// import {  } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule,MatSelectModule,MatSortModule  } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';  

@NgModule({
  declarations: [EmployeeListComponent,dialogBoxComponent],
  entryComponents: [dialogBoxComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    EmployeeListRoutingModule,
    FlexLayoutModule,
    MatButtonModule, MatCardModule, MatIconModule, MatTableModule,
    MatGridListModule,MatSortModule,
    MatFormFieldModule,MatInputModule, MatPaginatorModule ,MatDialogModule,MatSelectModule
  ],
providers:[ConfigService]

})
export class EmployeeListModule { }
