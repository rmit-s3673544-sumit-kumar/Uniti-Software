import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../../shared/services/config-service'
import { FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

  getEmployeeURL:any='/getEmployeeById'; 
  empid: any;
  employeeData: any;
  flag: boolean=false;
 
  constructor(private service : ConfigService,private fb: FormBuilder,private route:Router) { }

  ngOnInit() {
    this.empid= localStorage.getItem("empid");
    // this.service.addEmployee(this.getEmployeeURL,this.empid)
    this.service.getMethod(this.getEmployeeURL+"/"+this.empid)
    .subscribe(response => {
     this.employeeData =  response;
     console.log(this.employeeData,"profile"); 
     this.flag=true;
    })
  }

}
