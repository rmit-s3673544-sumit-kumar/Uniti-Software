import { Component, OnInit } from '@angular/core'; 
import { ConfigService } from './../../shared/services/config-service'
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    dashboardData: Object;
    dashboardURL: any='/dashboard';
    isAvailable:boolean;  
    constructor(private service: ConfigService,private route: Router) { }

    ngOnInit() {
        this.service.getMethod(this.dashboardURL)
        .subscribe(response => {
          this.dashboardData = response,
          this.isAvailable=true;
        })
    } 
}
