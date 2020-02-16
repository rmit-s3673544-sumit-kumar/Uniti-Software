import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../../shared/services/config-service'
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-shift',
  templateUrl: './my-shift.component.html',
  styleUrls: ['./my-shift.component.scss']
})
export class MyShiftComponent implements OnInit {

  getRoundList = '/findRoundByEmployeeAndDate'
  roundList: any;
  displayedColumns: string[] = ['roundid', 'empid', 'date', 'viewList', 'edit'];
  deleteRoundURL = '/deleteRound';
  loggedEmpId: number;
  error: boolean = false;

  constructor(private service: ConfigService, private fb: FormBuilder, private route: Router) { }

  ngOnInit() {
    this.loggedEmpId = +localStorage.getItem("empid")
  }

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
  createItem() {
    return this.fb.group({
      visitId: [''],
      cilent: [''],
      startTime: [''],
      endTime: [''],
      address: [''],
      duration: [''],
      status: [''],
      cost: [''],
      ftareason: ['']
    });
  }
  dateFrom = this.fb.group({
    date: ['', Validators.required]
  })

  getRoundsByDate(form) {
    form.employee.empId = this.loggedEmpId;
    this.service.postMethod(this.getRoundList, form)
      .subscribe(response => {
        this.roundList = response;
        console.log(this.roundList.roundId)
        if (this.roundList.date) {
          this.error = false;
          localStorage.setItem("roundId", this.roundList.roundId);
          this.route.navigateByUrl("/round-edit");
        } else {
          this.error = true;
        }

      })
  }
}
