import { Component, OnInit } from '@angular/core'; 
import { ConfigService } from './../../shared/services/config-service';
import { Router } from '@angular/router';   

@Component({
  selector: 'app-visit-view',
  templateUrl: './visit-view.component.html',
  styleUrls: ['./visit-view.component.scss']
})
export class VisitViewComponent implements OnInit {

  roundId:number;
  getRoundURL="/getRoundById"
  roundList: any;
  displayedColumns: string[] = ['client','startTime', 'endTime','address','duration','status','ftareason','cost'];
  visit: any;

  constructor(private service : ConfigService,private route:Router) { }

  ngOnInit() {
    this.roundId = +localStorage.getItem("roundId")
    this.getRoundsById(); 
  }
  getRoundsById(){ 
    
    this.service.getMethod(this.getRoundURL+"/"+this.roundId)
    .subscribe(response => {
     this.roundList =  response;
     this.visit = this.roundList.visit;
     this.visit.forEach(obj => {
       obj.startTime=new Date('2000-01-01'+' '+obj.startTime).toLocaleTimeString();
       obj.endTime=new Date('2000-01-01'+' '+obj.endTime).toLocaleTimeString();
     });
    }) 
  }
}
