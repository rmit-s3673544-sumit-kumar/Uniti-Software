import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../../shared/services/config-service' 
import { FormGroup, FormControl,FormBuilder,Validators,FormArray  } from '@angular/forms';
import { Router } from '@angular/router';   
import * as moment from 'moment';
@Component({
  selector: 'app-round-edit',
  templateUrl: './round-edit.component.html',
  styleUrls: ['./round-edit.component.scss']
})
export class RoundEditComponent implements OnInit {

  getRoundURL="/getRoundById"
  roundEditURL="/updateRound"
  roundId: number;
  roundList: any;
  visit: any;
  roleid: number;

  constructor(private service : ConfigService,private fb: FormBuilder,private route:Router) { }

  ngOnInit() {
    this.roleid = +localStorage.getItem("roleid") 
    this.roundId = +localStorage.getItem("roundId")
    this.getRoundsById();
   
  }
  getRoundsById(){  
    this.service.getMethod(this.getRoundURL+"/"+this.roundId)
    .subscribe(response => {
     this.roundList =  response;
     this.visit = this.roundList.visit; 
     if(this.visit){
      this.loadTheForm();
     } 
    }) 
  }
 

  roundForm=this.fb.group({
    roundId:[''],
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
    status:[''],
    ftareason: [''],
    cost: ['']
  });
}

loadTheForm(){  
  const linesFormArray = this.roundForm.get("visit") as FormArray;

  for (let line = 1; line < this.visit.length; line++){
    // const linesFormArray = this.roundForm.get("visit") as FormArray;
    linesFormArray.push(this.createItem()); 
}

this.roundList.visit.forEach(round => {
  round.startTime = new Date('2000-01-01'+' '+round.startTime);
  round.endTime= new Date('2000-01-01'+' '+round.endTime);
});
console.log(this.roundList)
this.roundForm.patchValue(this.roundList);
}


addItem(): void { 
  this.visit = this.roundForm.get('visit') as FormArray;
  this.visit.push(this.createItem()); 
}

onSubmit(form){
  form.roundId=this.roundList.roundId;
  form.employee.empId=this.roundList.employee.empId;
  form.date=this.roundList.date;
  form.adminName=this.roundList.adminName;
  form.visit.forEach(element => {
    element.startTime=element.startTime.toTimeString().substring(0,8);
    element.endTime=element.endTime.toTimeString().substring(0,8);
  });
  this.service.updateMethod(this.roundEditURL,form)
  .subscribe(response => {
  //  this.roundSaved =  response;  
  this.route.navigateByUrl("/round-list");
  })
}
 

}
