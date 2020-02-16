import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ConfigService } from './../../shared/services/config-service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'; 

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})

export class EmployeeListComponent implements OnInit {

  employeeList: any;
  getEmployeeList: any = '/getEmployeeList';
  // deleteEmployee: any = '/deleteEmployeeById';
  deleteEmployee: any = '/disableById';

  dataSource: any = new MatTableDataSource<any>();

  displayedColumns: string[] = ['empId', 'login', 'firstName', 'lastName', 'edit', 'delete'];
  
  status: Object;
  datastorage: any;

  constructor(private service: ConfigService, private route: Router, public dialog: MatDialog) { }
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() { 
    this.download(); 
    this.dataSource.sort = this.sort;
  }
  ngAfterViewInit(): void { 
  }
  download() {
    this.service.getMethod(this.getEmployeeList)
      .subscribe(results => {
        // this.dataSource = results;
        this.datastorage = results;  
        this.dataSource = new MatTableDataSource(this.datastorage); 
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      )
  } 
  public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    }
  edit(id) {
    this.route.navigate(['/employee-edit/', id]);
  }

  delete(id,name) {
    if(confirm("Are you sure to delete "+name+" of Emp ID "+id)) { 
      this.service.deleteMethod(this.deleteEmployee + "/" + id)
      .subscribe(results => {
        this.status = results,
          this.download();
      })
    }
   
  }
  navigateToAdd(){
    this.route.navigateByUrl("/addemployee");
  }
  openDialog(empid, name): void {

    const dialogRef = this.dialog.open(dialogBoxComponent, {
      width: '500px',
      data: { id: empid, user: name }
    });
  }
}
 
@Component({
  selector: 'dialogBox',
  templateUrl: 'dialogBox.html',
  styleUrls: ['./employee-list.component.scss']

})
export class dialogBoxComponent {

  saveUserURL: any = '/updateUser';
  getUserDetailURL: any = '/getUserByEmployee';
  checkUserExistURL='/userCheckExist';
  userDetail: any; 
  roles: FormGroup;
  rollllid: any;
  userExistResponse: any;
  userExistError: boolean;

  constructor(private service: ConfigService, private fb: FormBuilder, public dialogRef: MatDialogRef<dialogBoxComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
 
    this.service.postMethod(this.getUserDetailURL, { empId: this.data.id })
      .subscribe(response => { 
        this.userDetail = response;  
        if (this.userDetail.username) {  
           this.profileForm.patchValue(this.userDetail);  
        }
      })
  }
   
  profileForm = this.fb.group({
    // userId:this.userDetail.userId, 
    userId: [''],
    username: ['',Validators.required],
    password: ['',Validators.required],
    employee: this.fb.group({
    empId: this.data.id, 
    }),

  });

  save(form) { 
      // form.userId = this.userDetail.userId; 
      this.service.postMethod(this.checkUserExistURL,form)
      .subscribe(response => { 
        this.userExistResponse = response;  

     if(this.userExistResponse.username==null || this.userExistResponse.employee.empId==this.data.id){
      this.service.updateMethod(this.saveUserURL, form)
      .subscribe(response => {
        this.userDetail = response;
        this.dialogRef.close();
        this.userExistError=true;
        this.userExistError=false;
      }) 
     }else{
      this.userExistError=true;
     }
      }) 
  
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}