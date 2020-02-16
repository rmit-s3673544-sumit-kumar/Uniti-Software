import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfigService } from './../../shared/services/config-service' 
// import { FormGroup, FormControl,FormBuilder,Validators,FormArray  } from '@angular/forms';
import { Router } from '@angular/router';  
import { NgbModal, NgbTimepicker, NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {Sort} from '@angular/material'; 
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-round-list',
  templateUrl: './round-list.component.html',
  styleUrls: ['./round-list.component.scss']
})
export class RoundListComponent implements OnInit {

  roundListURL = '/getRoundList';
  deleteRoundURL='/deleteRound';
  isRecordEmpty:boolean; 
  roundListAll: any = new MatTableDataSource<any>();
  dataSource: any; 
  displayedColumns: string[] = ['roundid','empname', 'date','viewList','edit','delete'];
  deletedRound: any;
 
  constructor(private service : ConfigService,private route:Router) {  } 
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getRoundList();
  }
  getRoundList(){  
    this.service.getMethod(this.roundListURL)
    .subscribe(response => {
      this.roundListAll=response; 
      if(this.roundListAll.length==0){
        this.isRecordEmpty=true;
      }
      this.roundListAll = new MatTableDataSource(this.roundListAll); 
      this.roundListAll.paginator = this.paginator;
    }) 
  }
  
  viewList(id){
    console.log("SDfasdf",id);
    localStorage.setItem("roundId",id);
    this.route.navigateByUrl("/visit-view");
  }
  delete(id,name){
    if(confirm("Are you sure to delete round ID "+id)) { 
      this.service.deleteMethod(this.deleteRoundURL+"/"+id)
      .subscribe(response => { 
        console.log(response); 
        this.deletedRound=response;
        this.getRoundList();
      })
    }

  }
  edit(id){
    console.log("SDfasdf",id);
    localStorage.setItem("roundId",id);
    this.route.navigateByUrl("/round-edit");
  }
}
