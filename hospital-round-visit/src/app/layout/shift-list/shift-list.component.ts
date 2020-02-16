import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../../shared/services/config-service' 
// import { FormGroup, FormControl,FormBuilder,Validators,FormArray  } from '@angular/forms';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-shift-list',
  templateUrl: './shift-list.component.html',
  styleUrls: ['./shift-list.component.scss']
})
export class ShiftListComponent implements OnInit {

  roundListURL = '/getRoundsByEmpId';
  // deleteRoundURL='/deleteRound';
  roundListAll:any; 
  dataSource: any; 
  displayedColumns: string[] = ['roundid','empid', 'date','viewList','edit'];
  deletedRound: any;
  empid: number;
 
  constructor(private service : ConfigService,private route:Router) {  
  }

  ngOnInit() {
    this.empid = +localStorage.getItem("empid")
    this.getRoundList();
  }
  getRoundList(){  
    console.log(this.roundListURL+"/"+this.empid)
    this.service.getMethod(this.roundListURL+"/"+this.empid)
    .subscribe(response => {
      this.roundListAll=response; 
      console.log(this.roundListAll,"all")
    }) 
  }
  
  viewList(id){
    console.log("SDfasdf",id);
    localStorage.setItem("roundId",id);
    this.route.navigateByUrl("/visit-view");
  }
 
  edit(id){
    console.log("SDfasdf",id);
    localStorage.setItem("roundId",id);
    this.route.navigateByUrl("/round-edit");
  }
}
