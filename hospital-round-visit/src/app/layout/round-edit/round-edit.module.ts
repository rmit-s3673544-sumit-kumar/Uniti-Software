import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoundEditRoutingModule } from './round-edit-routing.module';
import { RoundEditComponent } from './round-edit.component';
import { ConfigService } from './../../shared/services/config-service';
import {MatStepperModule} from '@angular/material/stepper'; 

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
  MatSelectModule,
  MatTableModule,MatAutocompleteModule
} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatRadioModule} from '@angular/material/radio';

import { ReactiveFormsModule } from '@angular/forms'; 
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [RoundEditComponent],
  imports: [
    CommonModule,
    RoundEditRoutingModule,
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
    MatSelectModule, 
    MatTableModule,
    MatCheckboxModule,
    MatStepperModule,NgbModule,MatAutocompleteModule,NgxMaterialTimepickerModule,
    
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    NgxSpinnerModule
  ],
  providers:[ConfigService]
})
export class RoundEditModule { }
