import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AddUserDialogComponent } from '../modal-dialogs/add-user-dialog/add-user-dialog.component';
declare var $: any;

export interface UserElement {
  id: number,
  client: string;
  program: string;
  firstName: string;
  lastName: string;
  emailId: string;
  role: string;
  queueAssignment: string;
}

const User_DATA: UserElement[] = [
  { id: 1, program: 'Program 1', client: 'Client 1', queueAssignment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', firstName: 'Sachin', lastName: 'Tendulkar', emailId: 'srt@email.com', role: 'Program Admin' },
  { id: 2, program: 'Program 2', client: 'Client 2', queueAssignment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', firstName: 'Sourav', lastName: 'Ganguly', emailId: 'ganguly@email.com', role: 'User' },
  { id: 3, program: 'Program 3', client: 'Client 3', queueAssignment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', firstName: 'Laxman', lastName: 'VVS', emailId: 'vvs.laxman@cricket.com', role: 'User' },
  { id: 4, program: 'Program 4', client: 'Client 1', queueAssignment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', firstName: 'Dhoni', lastName: 'Mahendra', emailId: 'dhoni@cool.com', role: 'User' },
  { id: 5, program: 'Program 5', client: 'Client 1', queueAssignment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', firstName: 'Rohit', lastName: 'Sharma', emailId: 'rohit@hitman.com', role: 'System Admin' },
  { id: 6, program: 'Program 6', client: 'Client 2', queueAssignment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', firstName: 'Dravid', lastName: 'Rahul', emailId: 'rahul@coach.com', role: 'Program Admin' },
  { id: 7, program: 'Program 7', client: 'Client 3', queueAssignment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', firstName: 'Yuvraj', lastName: 'Singh', emailId: 'yuvi@uvcan.com', role: 'System Admin' },
];

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'client', 'program', 'firstName', 'lastName', 'emailId', 'role', 'queueAssignment'];
  dataSource = new MatTableDataSource(User_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  animal: string;
  name: string;

  constructor(public dialog: MatDialog, public clientDialog: MatDialog, public programDialog: MatDialog) { }

  openDialogAddNewUser(): void {
    const dialogRef = this.programDialog.open(AddUserDialogComponent);

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        const ids = this.dataSource.data.map(id => id.id);
        const max_id = ids.length > 0 ? Math.max(...ids) : 0;

        const newRow: UserElement = {
          id: max_id + 1,
          client: result.selectedClientValue,
          program: result.selectedProgramValue,
          firstName: result.firstNameValue,
          lastName: result.lastNameValue,
          emailId: result.emailIdValue,
          role: result.selectedRoleValue,
          queueAssignment: result.queueAssignment
        };

        this.dataSource.data.push(newRow);
        const newData = [...this.dataSource.data];
        this.dataSource.data = [];
        this.dataSource.data = newData;

        this.displaySuccessNotification(newRow.firstName + ' ' + newRow.lastName );
        this.animal = result;
      }
    });
  }

  displaySuccessNotification(userName: string) {
    const type = 'info';
    const from = 'bottom';
    const align = 'right';

    $.notify(
      {
        icon: 'notification',
        message: '<b>New User</b> : ' + userName + ', is added successfully</b>'
      },
      {
        type: type,
        placement: {
          from: from,
          align: align
        }
      }
    );
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
