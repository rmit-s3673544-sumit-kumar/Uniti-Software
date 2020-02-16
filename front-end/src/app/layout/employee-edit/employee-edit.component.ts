import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../../shared/services/config-service'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {
  employeeData: any;
  id: any;
  getEmployeeURL: any = '/getEmployeeById';
  postEmployeeURL: any = '/updateEmployee';

  constructor(private service: ConfigService, private fb: FormBuilder, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");

    this.service.getMethod(this.getEmployeeURL + "/" + this.id)
      .subscribe(response => {
        this.employeeData = response
        this.updateValue();
      })
  }
  // string = new Date(bDate).toUTCString();
  updateValue() {
    this.profileForm.patchValue({
      firstName: this.employeeData.firstName,
      lastName: this.employeeData.lastName,
      dob: this.fromJsonDate(this.employeeData.dob),
      number: this.employeeData.number,
      gender: this.employeeData.gender
    });
  }

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    dob: [''],
    number: ['', Validators.required],

  });
  fromJsonDate(jDate): string {
    const bDate: Date = new Date(jDate);
    return bDate.toISOString().substring(0, 10);  //Ignore time
  }
  onSubmit(form) {
    form.empId = this.id;
    this.service.updateMethod(this.postEmployeeURL, form)
      .subscribe(response => {
        this.employeeData = response
        this.route.navigate(['/employee-list']);
      })
  }

} 
