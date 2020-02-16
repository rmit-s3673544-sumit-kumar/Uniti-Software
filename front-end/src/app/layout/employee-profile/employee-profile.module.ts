import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeProfileRoutingModule } from './employee-profile-routing.module';
import { EmployeeProfileComponent } from './employee-profile.component';

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


  import { ReactiveFormsModule } from '@angular/forms'; 
  import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [EmployeeProfileComponent],
  imports: [
    CommonModule,
    EmployeeProfileRoutingModule,
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
    MatRadioModule,
    ReactiveFormsModule,
    MatGridListModule
  ],
  providers:[ConfigService]
})
export class EmployeeProfileModule { }
