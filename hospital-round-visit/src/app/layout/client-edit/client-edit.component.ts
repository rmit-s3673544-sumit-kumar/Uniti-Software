import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../../shared/services/config-service'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {

  ClientData: any;
  id: any;
  getClientURL: any = '/getClientById';
  postClientURL: any = '/updateClient';

  constructor(private service: ConfigService, private fb: FormBuilder, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");

    this.service.getMethod(this.getClientURL + "/" + this.id)
      .subscribe(response => {
        this.ClientData = response
        this.updateValue();
      })
  }
  updateValue() {
    this.profileForm.patchValue({
      firstName: this.ClientData.firstName,
      lastName: this.ClientData.lastName,
      gender: this.ClientData.gender,
      dob: this.fromJsonDate(this.ClientData.dob),
    });
  }
  fromJsonDate(jDate): string {
    const bDate: Date = new Date(jDate);
    return bDate.toISOString().substring(0, 10);  //Ignore time
  }

  profileForm = this.fb.group({

    firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
    gender: [''],
    dob: ['', Validators.required],

  });
  public hasError = (controlName: string, errorName: string) => {
    return this.profileForm.controls[controlName].hasError(errorName);
  }

  onSubmit(form) {
    form.clientId = this.id;
    this.service.updateMethod(this.postClientURL, form)
      .subscribe(response => {
        this.ClientData = response
        this.route.navigate(['/client-list']);
      })
  }

} 
