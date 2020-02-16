import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
    @Input() bgClass: string;
    @Input() icon: string;
    @Input() count: number;
    @Input() label: string;
    @Input() data: number;

    constructor(private route:Router) {}

    ngOnInit() {}
    redirectTo(id){
        switch(id){
            case 'Employees!' : this.route.navigateByUrl("/employee-list");
            break;
            case 'Rounds!' : this.route.navigateByUrl("/round-list");
            break;
            case '' : this.route.navigateByUrl("/client-list");
            break;
            default: this.route.navigateByUrl("/round-list"); 
        }
         
    }
}
