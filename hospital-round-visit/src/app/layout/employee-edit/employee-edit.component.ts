import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../../shared/services/config-service'
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
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
  emailResponse: any;
  emailCheckExistURL='/emailCheckExist';
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
  constructor(private service: ConfigService, private fb: FormBuilder, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.addCheckboxes();
    this.id = this.activatedRoute.snapshot.paramMap.get("id");

    this.service.getMethod(this.getEmployeeURL + "/" + this.id)
      .subscribe(response => {
        this.employeeData = response
        this.updateValue();
      })
   
  }
  private addCheckboxes() {
    this.availability.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (<FormArray>this.profileForm.get('availability')).push(control);
    });
  }
  // string = new Date(bDate).toUTCString();
  updateValue() {
    // this.profileForm.patchValue(this.employeeData);
    this.profileForm.patchValue({
      firstName: this.employeeData.firstName,
      lastName: this.employeeData.lastName,
      email:this.employeeData.email,
      roles:{
          roleId:this.employeeData.roles.roleId.toString()
      },
      dob: this.fromJsonDate(this.employeeData.dob),
      number: this.employeeData.number,
      gender: this.employeeData.gender,
      qualification:this.employeeData.qualification,
      availability: this.availabilityArray()
    });
  }
   availabilityArray(){
    var arr=[false,false,false,false,false,false,false]
    this.employeeData.availability.forEach(element => { 
      if(element.id){
        arr[element.id-1]=true;
      }
    });
  return arr;
}
  profileForm = this.fb.group({

    firstName: ['', [Validators.required,Validators.pattern(/^[a-zA-Z ]*$/)]],
    lastName: ['',  [Validators.required,Validators.pattern(/^[a-zA-Z ]*$/)]],
    gender: [''],
    email:['',[Validators.email, Validators.required]],
    roles:this.fb.group({
      roleId:['', Validators.required],
    }),
    dob: ['', Validators.required],
    number: ['', [Validators.required,Validators.pattern(/^-?([0-9]\d*)?$/)]],
    qualification:['',Validators.required],
    availability:this.fb.array([])
  });

  public hasError = (controlName: string, errorName: string) =>{
    return this.profileForm.controls[controlName].hasError(errorName);
  }
  fromJsonDate(jDate): string {
    const bDate: Date = new Date(jDate);
    return bDate.toISOString().substring(0, 10);  //Ignore time
  } 
  onSubmit(form) { 
    form.empId = this.id;
    var avail=[];
    for(var i=0;i<form.availability.length;i++){
      if(form.availability[i]){
        var obj = {
          id:i+1
        }
      avail.push(obj);
      }
    }
    form.availability=avail;
    console.log(form);
    this.service.postMethod(this.emailCheckExistURL,form)
    .subscribe(response => { 
          this.emailResponse=response;

          if(this.emailResponse.email==null || this.emailResponse.empId==this.id){ 
            this.service.updateMethod(this.postEmployeeURL, form) 
            .subscribe(response => {
              this.employeeData = response
              this.route.navigate(['/employee-list']);
            })
          }else{
            this.emailExistError=true;
          }
    }) 

  }
} 
