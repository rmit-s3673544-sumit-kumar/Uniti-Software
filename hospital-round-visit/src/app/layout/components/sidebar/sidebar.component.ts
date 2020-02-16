import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    
    public showMenu: string;
    roleid:any;

    constructor(public router: Router) {}

    ngOnInit() {
        this.showMenu = ''; 
        this.roleid = localStorage.getItem("roleid");  
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
 
    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        localStorage.clear();
        this.router.navigate(['/login']);
    }
}
