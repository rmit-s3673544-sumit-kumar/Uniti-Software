import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRoutingModule } from './leave-routing.module';
import { LeaveComponent,PizzaPartyComponent } from './leave.component';
import {MatTabsModule} from '@angular/material/tabs';
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
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { ReactiveFormsModule } from '@angular/forms'; 
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [LeaveComponent,PizzaPartyComponent],
  entryComponents: [PizzaPartyComponent],
  imports: [
    CommonModule,
    LeaveRoutingModule,MatTabsModule,
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
    MatRadioModule,
    ReactiveFormsModule,MatSnackBarModule,MatTableModule
    
  ],
  providers:[ConfigService]
})
export class LeaveModule { }
