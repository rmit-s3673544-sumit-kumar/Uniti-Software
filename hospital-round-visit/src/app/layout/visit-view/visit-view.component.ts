import { Component, OnInit } from '@angular/core'; 
import { ConfigService } from './../../shared/services/config-service';
import { Router } from '@angular/router';   

import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-visit-view',
  templateUrl: './visit-view.component.html',
  styleUrls: ['./visit-view.component.scss']
})
export class VisitViewComponent implements OnInit {

  roundId:number;
  getRoundURL="/getRoundById"
  roundList: any;
  // displayedColumns: string[] = ['client','startTime', 'endTime','duration','address','status','ftareason'];
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

  public captureScreen()
{
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
    // Few necessary setting options
    var imgWidth = 208;
    var pageHeight = 295;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;
    
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    var position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdf.save(this.roundList.employee.empId+"-"+this.roundList.employee.firstName+"-"+this.roundList.date); // Generated PDF
    });
    }
}
