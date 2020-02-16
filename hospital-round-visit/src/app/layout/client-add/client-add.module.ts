import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientAddRoutingModule } from './client-add-routing.module';
import { ClientAddComponent } from './client-add.component';
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
  declarations: [ClientAddComponent],
  imports: [
    CommonModule,
    ClientAddRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatRadioModule, 
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers:[ConfigService]
  
})
export class ClientAddModule { }
