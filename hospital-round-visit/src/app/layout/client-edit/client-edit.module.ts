import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientEditRoutingModule } from './client-edit-routing.module';
import { ClientEditComponent } from './client-edit.component';
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
@NgModule({
  declarations: [ClientEditComponent],
  imports: [
    CommonModule,
    ClientEditRoutingModule,
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
    MatRadioModule
  ],
  providers:[ConfigService]
  
})
export class ClientEditModule { }
