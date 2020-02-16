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
  deleteEmployee: any = '/deleteEmployeeById';

  dataSource: any;

  displayedColumns: string[] = ['id', 'login', 'firstName', 'lastName', 'edit', 'delete'];

  status: Object;

  constructor(private service: ConfigService, private route: Router, public dialog: MatDialog) { }

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    this.download();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.paginator = this.paginator;
  }

  download() {
    this.service.getMethod(this.getEmployeeList)
      .subscribe(results =>
        this.dataSource = results,
      )
  }

  edit(id) {
    this.route.navigate(['/employee-edit/', id]);
  }

  delete(id) {
    this.service.deleteMethod(this.deleteEmployee + "/" + id)
      .subscribe(results => {
        this.status = results,
          this.download();
      })
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
  userDetail: any;
  flag: boolean = false;
  roles: FormGroup;

  constructor(private service: ConfigService, private fb: FormBuilder, public dialogRef: MatDialogRef<dialogBoxComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {

    console.log("flag", this.flag);

    this.service.postMethod(this.getUserDetailURL, { empId: this.data.id })
      .subscribe(response => {

        this.userDetail = response;
        console.log(this.userDetail, "userdettail")

        if (this.userDetail.username) {
          this.flag = true;
          console.log("flag", this.flag)
          this.updateValue();
        }

      })
  }
  updateValue() {
    this.profileForm.patchValue({
      userId: this.userDetail.userId,
      username: this.userDetail.username,
      password: this.userDetail.password,
      roles: {
        roleId: this.userDetail.roles.roleId.toString(),
      }
    });
  }



  profileForm = this.fb.group({
    // userId:this.userDetail.userId,
    employee: this.fb.group({
      empId: this.data.id
    }),
    userId: [''],
    username: [''],
    password: [''],
    roleid: [''],
    roles: this.fb.group({
      roleId: [''],
      roleName: ['']
    })
  });

  save(form) {
    if (this.flag) {

      form.userid = this.userDetail.userid;
      console.log(form, "formdata");
      this.service.updateMethod(this.saveUserURL, form)
        .subscribe(response => {
          this.userDetail = response
        })

    } else {

      this.service.postMethod(this.saveUserURL, form)
        .subscribe(response => {
          this.userDetail = response
        })

    }

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}