import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../../shared/services/config-service' 
import { FormGroup, FormControl,FormBuilder,Validators,FormArray, ValidatorFn, AsyncValidatorFn, AbstractControl  } from '@angular/forms';
import { Router } from '@angular/router';   

@Component({
  selector: 'app-round-add',
  templateUrl: './round-add.component.html',
  styleUrls: ['./round-add.component.scss']
})
export class RoundAddComponent implements OnInit {
  // dataSource: any; 
  onchecked:any; 
  displayedColumns: string[] = ['select','empId', 'firstName', 'status']; 
  isLinear = false;
  getEmpList="/getEmployeeListByDate";
  roundAddURL="/addRound"
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;

  visit: FormArray;
  dataSource: any;
  allEmpList: any;
  roundDate:Date;
  checkedName: any;
  todayDate: Date;
  loggedInUser: string;
  // FinalEmp: any;
  constructor(private service : ConfigService,private fb: FormBuilder,private route:Router) { }

  ngOnInit() { 
    this.todayDate = new Date();
    this.loggedInUser=localStorage.getItem("userName");
  }
    roundForm=this.fb.group({
      roundid:[''],
      date:[''],
      employee:this.fb.group({
        empId:[''],
        name:[''],
        number:[''],
        gender:['']
      }),
      visit:this.fb.array([this.createItem()])
    })
    

  fromJsonDate() {
    const bDate: Date = new Date();
    console.log(bDate.toISOString());  //Ignore time
  } 

  createItem(){
    return this.fb.group({
      visitId: [''],
      client: [''],
      startTime: [''],
      endTime: [''],
      address: [''],
      duration: [''],
      status:['',],
      cost: [''],
      ftareason: ['']
    });
  }

  getEmployeeList(form){
    console.log(form.date);
    this.roundDate = form.date;
    this.service.postMethod(this.getEmpList,form.date)
    .subscribe(response => {
     this.allEmpList =  response; 
    //  this.FinalEmp = this.allEmpList.allEmployee;
    if(this.allEmpList.busyEmployee.length!=0){
      this.allocate();  
    }else{ 
      this.allEmpList.allEmployee.forEach(allEmp => { 
            allEmp.status="free"  
      }); 
      this.dataSource=this.allEmpList.allEmployee
    }
    
    }) 
  }
  allocate(){
    this.allEmpList.allEmployee.forEach(allEmp => {
      this.allEmpList.busyEmployee.forEach(busyEmp => {
        if(allEmp.empId==busyEmp.empId){
          allEmp.status="busy" 
        }else if(allEmp.status!='busy'){
          allEmp.status="free" 
        }
      }); 
    });
    this.dataSource=this.allEmpList.allEmployee;
  }
  addItem(): void { 
    this.visit = this.roundForm.get('visit') as FormArray;
    this.visit.push(this.createItem());
    console.log(this.roundForm)
  }
  backToDate(){
    this.onchecked="";
    this.checkedName="";
  }
  firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required]
  });

  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required]
  });

  checkBoxEvent(id,name){ 
    this.onchecked=id;
    this.checkedName=name;
  }
  onSubmit(form){

    form.employee.empId=this.onchecked;
    form.date=this.roundDate;
    form.adminName=this.loggedInUser;
    if(form.visit.length!=-1){

    }
    form.visit.forEach(element => {
      element.startTime=element.startTime.toTimeString().substring(0,8);
      element.endTime=element.endTime.toTimeString().substring(0,8);
    });
    
    this.service.postMethod(this.roundAddURL,form)
    .subscribe(response => {
    //  this.roundSaved =  response;  
     this.route.navigateByUrl("/round-list");
    })
  }
  dateFrom = this.fb.group({
    date:['',Validators.required]
  })
  removeRow(index) {
    this.roundForm.get('visit')['controls'].splice(index, 1);
  //  var formarray =  this.roundForm.get('visit') as FormArray
  //   formarray.controls.splice(index, 1);
  }
}
