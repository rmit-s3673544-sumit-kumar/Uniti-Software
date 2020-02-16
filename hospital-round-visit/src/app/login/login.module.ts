import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { ConfigService } from './../shared/services/config-service'
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormsModule } from '@angular/forms';


@NgModule({
    
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
     providers:[ConfigService]

})
export class LoginModule {}
