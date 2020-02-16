import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyShiftRoutingModule } from './my-shift-routing.module';
import { MyShiftComponent } from './my-shift.component';
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
  MatTableModule
} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatRadioModule} from '@angular/material/radio';

import { ReactiveFormsModule } from '@angular/forms'; 
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [MyShiftComponent],
  imports: [
    CommonModule,
    MyShiftRoutingModule,
    MatStepperModule,
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
    MatTableModule,
    MatCheckboxModule,
    MatRadioModule,
    ReactiveFormsModule,
    NgbModule,
    OwlDateTimeModule, OwlNativeDateTimeModule
  ],
  providers:[ConfigService]
})
export class MyShiftModule { }
