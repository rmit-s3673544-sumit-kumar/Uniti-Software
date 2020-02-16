import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../../shared/services/config-service'
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {
  employeeList: any;
  postEmployeeURL: any = '/addEmployee';
  emailCheckExistURL = '/emailCheckExist';
  emailResponse: any;
  emailExistError: boolean;
  availability = [
    { id: 1, day: 'monday' },
    { id: 2, day: 'tuesday' },
    { id: 3, day: 'wednesday' },
    { id: 4, day: 'thursday' },
    { id: 5, day: 'friday' },
    { id: 6, day: 'saturday' },
    { id: 7, day: 'sunday' },
  ];
  constructor(private service: ConfigService, private fb: FormBuilder, private route: Router) { }

  ngOnInit() {
    this.addCheckboxes();
  }
  private addCheckboxes() {
    this.availability.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (<FormArray>this.profileForm.get('availability')).push(control);
    });
  }
  profileForm = this.fb.group({

    firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
    gender: [''],
    email: ['', [Validators.email, Validators.required]],
    roles: this.fb.group({
      roleId: ['', Validators.required],
    }),
    dob: ['', Validators.required],
    number: ['', [Validators.required, Validators.pattern(/^-?([0-9]\d*)?$/)]],
    qualification: ['', Validators.required],
    availability: this.fb.array([])
  });


  public hasError = (controlName: string, errorName: string) => {
    return this.profileForm.controls[controlName].hasError(errorName);
  }

  onSubmit(form) {

    var avail = [];
    for (var i = 0; i < form.availability.length; i++) {
      if (form.availability[i]) {
        var obj = {
          id: i + 1
        }
        avail.push(obj);
      }
    }
    form.availability = avail;
    console.log(form)
    this.service.postMethod(this.emailCheckExistURL, form)
      .subscribe(response => {
        this.emailResponse = response;

        if (this.emailResponse.email == null) {
          this.service.postMethod(this.postEmployeeURL, form)
            .subscribe(response => {
              this.employeeList = response;
              this.route.navigate(['/employee-list']);
            })
        } else {
          this.emailExistError = true;
        }
      })

  }

}
