import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from './../../shared/services/config-service'
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
// import { AbstractControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-round-add',
  templateUrl: './round-add.component.html',
  styleUrls: ['./round-add.component.scss']
})
export class RoundAddComponent implements OnInit {
  // dataSource: any;
  color = 'accent';
  mode = 'determinate';
  value = 0;
  onchecked: any;
  displayedColumns: string[] = ['select', 'empId', 'firstName', 'qualification', 'status'];
  isLinear: boolean = true;
  getEmpList = "/getEmployeeListByDate";
  roundAddURL = "/addRound"
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;

  visit: FormArray;
  // clientList:FormGroup;
  dataSource: any = new MatTableDataSource<any>();
  allEmpList: any;
  roundDate: Date;
  checkedName: any;
  todayDate: Date;
  loggedInUser: string;
  // FinalEmp: any;

  filteredOptions: Observable<any[]>;
  clientName = new FormControl();
  updatedValue: FormArray;
  newvalue: FormArray;
  getClientList: any = '/getClientList';
  clientList: any[] = [];
  clientListResponse: any;
  datastorage: any;
  rowId: number = 0;
  empid: any;
  isError: boolean;
  errorEmp: boolean;
  minDate: Date = new Date;
  TimeArray: any[] = [];
  TimeError: boolean;
  FromToTimeError: boolean;
  concatDate:any='2019-05-26 ';  
  // isLoading: boolean=false;
  deleteButton:boolean=false;

  constructor(private service: ConfigService, private fb: FormBuilder, private route: Router,private spinner: NgxSpinnerService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.todayDate = new Date();
    this.loggedInUser = localStorage.getItem("userName");

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

  dateFrom = this.fb.group({
    date: ['', Validators.required]
  })

  roundForm = this.fb.group({
    roundid: [''],
    date: [''],
    employee: this.fb.group({
      empId: [''],
      name: [''],
      number: [''],
      gender: ['']
    }),
    visit: this.fb.array([this.createItem()])
  })


  fromJsonDate() {
    const bDate: Date = new Date();
    console.log(bDate.toISOString());  //Ignore time
  }

  createItem() {
    return this.fb.group({
      visitId: [''],
      client: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      address: ['', Validators.required],
      duration: ['', Validators.required],
      status: [''],
      cost: [''],
      ftareason: ['']
    });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  getEmployeeList(form) {
    if (form.date) {
      this.roundDate = form.date;
    }
    this.service.postMethod(this.getEmpList, form.date)
      .subscribe(response => {
        this.allEmpList = response;
        //  this.FinalEmp = this.allEmpList.allEmployee;
        if (this.allEmpList.busyEmployee.length != 0) {
          this.allocate();
        } else {
          this.allEmpList.allEmployee.forEach(allEmp => {
            allEmp.status = "free"
          });
          this.datastorage = this.allEmpList.allEmployee;
          this.dataSource = new MatTableDataSource(this.datastorage);
          this.dataSource.paginator = this.paginator;
        }

      })
  }
  allocate() {
    this.allEmpList.allEmployee.forEach(allEmp => {
      this.allEmpList.busyEmployee.forEach(busyEmp => {
        if (allEmp.empId == busyEmp.empId) {
          allEmp.status = "busy"
        } else if (allEmp.status != 'busy') {
          allEmp.status = "free"
        }
      });
    });
    // this.dataSource=this.allEmpList.allEmployee;
    this.datastorage = this.allEmpList.allEmployee;
    this.dataSource = new MatTableDataSource(this.datastorage);
    this.dataSource.paginator = this.paginator;
  }
  addItem(): void {
    this.visit = this.roundForm.get('visit') as FormArray;
    this.visit.push(this.createItem());
    console.log(this.roundForm)
  }
  backToDate() {
    this.onchecked = "";
    this.checkedName = "";
  }
  firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required]
  });

  secondFormGroup = this.fb.group({
    empId: ['']
  });

  checkBoxEvent(id, name, event) {
    if (event.checked) {
      this.onchecked = id;
      this.checkedName = name;
      this.isError = false;
      this.errorEmp = false;
    } else {
      this.onchecked = "";
      this.checkedName = "";
      this.isError = true;
    }

    // this.empid=id;
  }


  timeOverlaps() {
    this.TimeError = false;
    for (var i = 0; i < this.TimeArray.length; i++) {

      for (var j = i + 1; j < this.TimeArray.length; j++) {
        if (((this.TimeArray[j].start < this.TimeArray[i].start) || (this.TimeArray[j].start > this.TimeArray[i].end)) &&
          ((this.TimeArray[j].end < this.TimeArray[i].start) || (this.TimeArray[j].end > this.TimeArray[i].end))) {
 
        } else {
          this.TimeError = true;
          this.spinnerOFF();
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
        this.spinnerOFF();
        this.spinner.hide();
        return;
      }
    }
  }
  onSubmit(form) { 
    this.spinnerOn();
    this.spinner.show();
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

    if (this.onchecked && !this.TimeError && !this.FromToTimeError) {
      form.employee.empId = this.onchecked;
      form.date = this.roundDate;
      form.adminName = this.loggedInUser;
      form.visit.forEach(element => {
        element.startTime = new Date(this.concatDate+element.startTime).toTimeString().substring(0, 8);
        element.endTime = new Date(this.concatDate+element.endTime).toTimeString().substring(0, 8);
      });


      this.service.postMethod(this.roundAddURL, form)
        .subscribe(response => {
          //  this.roundSaved =  response; 
          // this.spinnerOFF(); 
          this.route.navigateByUrl("/round-list");
        })
    }else {
      if (!this.onchecked) {
        this.errorEmp = true;
        this.spinnerOFF();
        this.spinner.hide();
      }
    }
    //  this.spinnerOFF();
  }
  spinnerOn() {
    this.color = 'accent';
    this.mode = 'indeterminate';
    this.value = 50;

  }
  spinnerOFF() {
    this.color = 'accent';
    this.mode = 'determinate';
    this.value = 0;
  }

  removeRow(index) {
    if (confirm("Are you sure to delete this visit row " + index)) { 
      var formarray = this.roundForm.get('visit') as FormArray
      formarray.removeAt(index);
      this.TimeError = false; 
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