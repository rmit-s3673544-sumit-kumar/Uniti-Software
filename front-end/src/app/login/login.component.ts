import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ConfigService } from './../shared/services/config-service'
import { FormGroup, FormControl,FormBuilder,Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    checkLogin: any = '/getUser';
    Result: any;
    loginError:boolean=false;
    loginFailStatus :string="user name or password is incorrect !"

    constructor(private service : ConfigService,private fb: FormBuilder,private router: Router) {}

    ngOnInit() { 
     
    }

    profileForm = this.fb.group({ 
        username: ['',Validators.required],
        password: ['',Validators.required] 
      });
     
    onLogin(form) { 
        this.service.postMethod(this.checkLogin,form)
        .subscribe(response => {
         this.Result =  response  
         this.redirect(); 
        }) 
    }
    redirect(){ 
        if(this.Result.username&&this.Result.password){
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('empid', this.Result.employee.empId);
            localStorage.setItem('roleid', this.Result.roles.roleId);
            localStorage.setItem('userName', this.Result.employee.firstName);
            
            this.router.navigate(['/dashboard']);
        }else{
            console.log("password error",this.Result.status);
            this.loginError=true;
        } 
    }
}
