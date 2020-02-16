import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../../shared/services/config-service'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {

  clientDetail: Object;
  postClientURL: any='/addClient';

  constructor(private service: ConfigService, private fb: FormBuilder, private route: Router) { }

  ngOnInit() {
  }

  profileForm = this.fb.group({

    firstName: ['', [Validators.required,Validators.pattern(/^[a-zA-Z ]*$/)]],
    lastName: ['',  [Validators.required,Validators.pattern(/^[a-zA-Z ]*$/)]],
    gender: [''],
    dob: ['', Validators.required],
   
  });

  public hasError = (controlName: string, errorName: string) =>{
    return this.profileForm.controls[controlName].hasError(errorName);
  }
  
  onSubmit(form) {
    this.service.postMethod(this.postClientURL, form)
      .subscribe(response => {
        this.clientDetail = response;
        this.route.navigate(['/client-list']);

      })
  }
 

}
