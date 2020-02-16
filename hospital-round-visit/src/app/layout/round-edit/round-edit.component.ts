import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../../shared/services/config-service' 
import { FormGroup, FormControl,FormBuilder,Validators,FormArray  } from '@angular/forms';
import { Router } from '@angular/router';   
import * as moment from 'moment';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { DISABLED } from '@angular/forms/src/model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

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
  updatedValue: FormArray; 
  getClientList: any = '/getClientList';
  clientList: any[] = [];
  clientListResponse: any;
  datastorage: any;
  rowId: number = 0;
  filteredOptions: Observable<any[]>;
  TimeError: boolean;
  TimeArray: any[] = []; 
  FromToTimeError: boolean;
  concatDate:any='2019-05-26 ';  
  onchecked: any;
  errorEmp: boolean;

  constructor(private service : ConfigService,private fb: FormBuilder,private route:Router,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.roleid = +localStorage.getItem("roleid") 
    this.roundId = +localStorage.getItem("roundId")
    this.getRoundsById();
   
    this.service.getMethod(this.getClientList)
    .subscribe(response => {
      this.clientListResponse = response;
      this.clientList = this.clientListResponse;

    })

  this.updatedValue = <FormArray>this.roundForm.get('visit');
  // this.filteredOptions = this.updatedValue.controls[0].get('clientName').valueChanges
  this.filteredOptions = this.updatedValue.controls[this.rowId].get('client').valueChanges
    .pipe(
      startWith<string | any>(''),
      map(value => typeof value === 'string' ? value : value.firstName),
      map(firstName => firstName ? this._filter(firstName) : this.clientList.slice())
    );

  }

  getRowID(id) {
    if (this.rowId != id) {
      this.filteredOptions = this.updatedValue.controls[id].get('client').valueChanges
        .pipe(
          startWith<string | any>(''),
          map(value => typeof value === 'string' ? value : value.firstName),
          map(firstName => firstName ? this._filter(firstName) : this.clientList.slice())
        );
    }

    this.rowId = +id;
    console.log(this.rowId)
  }

  private _filter(firstName: string): any[] {
    const filterValue = firstName.toLowerCase();
    return this.clientList.filter(option => option.firstName.toLowerCase().indexOf(filterValue) === 0);
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
    client: ['',Validators.required], 
    startTime: ['',Validators.required],
    endTime: ['',Validators.required],
    address: ['',Validators.required],
    duration: ['',Validators.required],
    status:[''],
    cost: [''],
    ftareason: ['']
  });
}
 
loadTheForm(){  
  const linesFormArray = this.roundForm.get("visit") as FormArray;

  for (let line = 1; line < this.visit.length; line++){
    // const linesFormArray = this.roundForm.get("visit") as FormArray;
    linesFormArray.push(this.createItem()); 
}
 
console.log(this.roundList)
this.roundForm.patchValue(this.roundList);
}


addItem(): void { 
  this.visit = this.roundForm.get('visit') as FormArray;
  this.visit.push(this.createItem()); 
}


timeOverlaps() {
  this.TimeError = false;
  for (var i = 0; i < this.TimeArray.length; i++) {

    for (var j = i + 1; j < this.TimeArray.length; j++) {
      if (((this.TimeArray[j].start < this.TimeArray[i].start) || (this.TimeArray[j].start > this.TimeArray[i].end)) &&
        ((this.TimeArray[j].end < this.TimeArray[i].start) || (this.TimeArray[j].end > this.TimeArray[i].end))) {

      } else {
        this.TimeError = true; 
        this.spinner.hide();
        return;
      }
    }
  }
}
fromToTimeValidation() {
  this.FromToTimeError = false;
  for (var i = 0; i < this.TimeArray.length; i++) {
    if (this.TimeArray[i].start < this.TimeArray[i].end) {
    } else {
      this.FromToTimeError = true; 
      this.spinner.hide();
      return;
    }
  }
}

onSubmit(form){
  this.spinner.show();
  form.roundId=this.roundList.roundId;
  form.employee.empId=this.roundList.employee.empId;
  form.date=this.roundList.date;
  form.adminName=this.roundList.adminName;
 
  this.TimeArray = [];
    
  form.visit.forEach(element => { 
    var a = new Date(this.concatDate+element.startTime);
    var b = new Date(this.concatDate+element.endTime);

     var c=a.getTime();
     var d=b.getTime();
    var obj = {
      start: c,
      end: d
    }
    this.TimeArray.push(obj);
  }); 

  this.fromToTimeValidation();
  this.timeOverlaps();

  if (!this.TimeError && !this.FromToTimeError) { 
    form.visit.forEach(element => {
      element.startTime = new Date(this.concatDate+element.startTime).toTimeString().substring(0, 8);
      element.endTime = new Date(this.concatDate+element.endTime).toTimeString().substring(0, 8);
    });
    this.service.updateMethod(this.roundEditURL,form)
    .subscribe(response => {
    //  this.roundSaved =  response;  
    this.route.navigateByUrl("/round-list");
    })
  }

}

onStatusClick(event,i){
  if (event.checked) {
    this.updatedValue = <FormArray>this.roundForm.get('visit');
    this.updatedValue.controls[i].get('ftareason').patchValue(""); 
    this.updatedValue.controls[i].get('ftareason').patchValue(""); 
    this.updatedValue.controls[i].get('ftareason').disable(); 
   
  }else{ 
    this.updatedValue.controls[i].get('ftareason').enable(); 
  }
}
removeRow(index) {

  if(confirm("Are you sure to delete this visit row "+index)) {  
    // this.roundForm.get('visit')['controls'].splice(index, 1);
      var formarray =  this.roundForm.get('visit') as FormArray
      formarray.removeAt(index); 
    //   formarray.controls.splice(index, 1);
  } 
}

onChangeStart(event,i){  
  this.calculateMinutes(i);
 }
 onChangeTo(event,i){
   this.calculateMinutes(i);
 }

 calculateMinutes(i){
   const timeForm = <FormArray>this.roundForm.get('visit');
   var stime = timeForm.controls[i].get('startTime').value; 
   var etime = timeForm.controls[i].get('endTime').value;  
   var a = new Date(this.concatDate+stime);
   var b = new Date(this.concatDate+etime); 

   if(a&&b&&(b.getTime()>a.getTime())){ 
     var diff =(b.getTime() - a.getTime()) / 1000;
     diff /= 60; 
     var minutes= Math.abs(Math.round(diff));
     this.updatedValue.controls[i].get('duration').patchValue(minutes); 
     a=null;
     b=null;
     this.FromToTimeError=false;
   }else if(b.getTime()<a.getTime()){
     this.FromToTimeError=true;
     this.updatedValue.controls[i].get('duration').patchValue(""); 
   }else{
     this.updatedValue.controls[i].get('duration').patchValue(""); 
   }
   
 }
}
