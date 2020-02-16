import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../../shared/services/config-service' 
import { FormGroup, FormControl,FormBuilder,Validators,FormArray  } from '@angular/forms';
import { Router } from '@angular/router';   

@Component({
  selector: 'app-round-view',
  templateUrl: './round-view.component.html',
  styleUrls: ['./round-view.component.scss']
})
export class RoundViewComponent implements OnInit {

  getRoundList='/getRoundsByDate'
  roundList: Object;
  displayedColumns: string[] = ['roundid','empid', 'date','viewList','edit','delete'];
  deleteRoundURL='/deleteRound';

  constructor(private service : ConfigService,private fb: FormBuilder,private route:Router) { }

  ngOnInit() {
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
  createItem(){
    return this.fb.group({
      visitId: [''],
      cilent: [''],
      startTime: [''],
      endTime: [''],
      address: [''],
      duration: [''],
      status:[''],
      cost: [''],
      ftareason: ['']
    });
  }
  dateFrom = this.fb.group({
    date:['',Validators.required]
  })

  firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required]
  });

  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required]
  });


  getRoundsByDate(form){
    console.log(form.date); 
    
    this.service.postMethod(this.getRoundList,form.date)
    .subscribe(response => {
     this.roundList =  response;  
    }) 
  }
  viewList(id){
    console.log("SDfasdf",id);
    localStorage.setItem("roundId",id);
    this.route.navigateByUrl("/visit-view");
  }
  delete(id){
    this.service.deleteMethod(this.deleteRoundURL+"/"+id)
    .subscribe(response => { 
      console.log(response)
    })
  }
  edit(id){
    console.log("SDfasdf",id);
    localStorage.setItem("roundId",id);
    this.route.navigateByUrl("/round-edit");
  }
}
