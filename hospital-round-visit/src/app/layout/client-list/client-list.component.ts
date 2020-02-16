import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from './../../shared/services/config-service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  clientList: any;
  getclientList: any = '/getClientList';
  // deleteclient: any = '/deleteClientById';
  deleteclient: any = '/disableClientById';

  isRecordEmpty: boolean;
  dataSource: any = new MatTableDataSource<any>();

  displayedColumns: string[] = ['clientId', 'firstName', 'lastName', 'edit', 'delete'];

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
    this.service.getMethod(this.getclientList)
      .subscribe(results => {
        // this.dataSource = results;
        this.datastorage = results;
        if (this.datastorage.length == 0) {
          this.isRecordEmpty = true
        }
        console.log(this.paginator);
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
    this.route.navigate(['/client-edit/', id]);
  }

  delete(id, name) {
    if (confirm("Are you sure to delete " + name + " of client ID " + id)) {
      this.service.getMethod(this.deleteclient + "/" + id)
        .subscribe(results => {
          this.status = results,
            this.download();
        })
    }

  }
  navigateToAdd() {
    this.route.navigateByUrl("/client-add");
  }
}
