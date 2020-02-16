import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../../shared/services/config-service'
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {

  leaveReqURL='http://localhost:8080/AMS/applyLeave';
  leaveListURL='http://localhost:8080/AMS/getLeaveList';
  leaveObj: any;
  LeaveList: any;
  empid:any;

  
  displayedColumns: string[] = ['leaveid', 'leaveFor', 'leaveDays', 'leaveDesc'];
  dataSource:any;


  constructor(private service : ConfigService,private fb: FormBuilder,private route:Router,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.empid=localStorage.getItem("empid");
    this.service.getMethod(this.leaveListURL)
      .subscribe(response => {
       this.dataSource =  response
      //  this.openSnackBar();
       console.log(this.dataSource,"obj list");
      })
  }
  LeaveForm = this.fb.group({ 
    leaveName: [''],
    leaveDays: [''],
    leaveDesc:[''],
    // leaveStatus:[''],
    // createdOn:[''],
    // lastUpdated:['']
  });

  onSubmit(form){
    form.empid= +this.empid,
    console.log(form,"sdfasd"); 
    this.service.postMethod(this.leaveReqURL,form)
      .subscribe(response => {
       this.leaveObj =  response
       this.openSnackBar();
       console.log(this.leaveObj,"obj final");
      })
      // this.route.navigateByUrl('/employee-list');
    }

    openSnackBar() {
      this.snackBar.openFromComponent(PizzaPartyComponent, {
        duration: 3000,
      });
    }
}

@Component({
  selector: 'snack-bar-component-example-snack',
  template: `<span class="example-pizza-party">
              Leave Submitted
            </span>`,
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class PizzaPartyComponent {}