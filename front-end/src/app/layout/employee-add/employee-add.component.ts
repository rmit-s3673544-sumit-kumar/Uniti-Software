import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../../shared/services/config-service'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {
  employeeList: any;
  postEmployeeURL: any = '/addEmployee';

  constructor(private service: ConfigService, private fb: FormBuilder, private route: Router) { }

  ngOnInit() {
  }

  profileForm = this.fb.group({

    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    dob: [''],
    number: ['', Validators.required],

  });

  onSubmit(form) {
    this.service.postMethod(this.postEmployeeURL, form)
      .subscribe(response => {
        this.employeeList = response;
        this.route.navigate(['/employee-list']);

      })
  }

}
