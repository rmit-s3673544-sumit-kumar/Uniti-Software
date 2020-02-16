import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeEditRoutingModule } from './employee-edit-routing.module';
import { EmployeeEditComponent } from './employee-edit.component';
import { ConfigService } from './../../shared/services/config-service'
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule
} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [EmployeeEditComponent],
  imports: [
    CommonModule,
    EmployeeEditRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule, 
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,MatCheckboxModule
  ],
  providers:[ConfigService]
})
export class EmployeeEditModule { }
