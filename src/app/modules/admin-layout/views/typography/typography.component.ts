import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../modal-dialogs/add-user-dialog/add-user-dialog.component';
import { AddClientDialogComponent } from '../modal-dialogs/add-client-dialog/add-client-dialog.component';
import { AddProgramDialogComponent } from '../modal-dialogs/add-program-dialog/add-program-dialog.component';
declare var $: any;
export interface PeriodicElement2 {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  client: string;
  description: string;
}

const ELEMENT_DATA_2: PeriodicElement2[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 12, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 13, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 14, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 15, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 16, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 17, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 18, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 19, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 20, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 21, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 22, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 23, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 24, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 25, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 26, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 27, name: 'Neon', weight: 20.1797, symbol: 'Ne' },

];

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Program 1', client: 'Client 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
  { position: 2, name: 'Program 2', client: 'Client 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
  { position: 3, name: 'Program 3', client: 'Client 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
  { position: 4, name: 'Program 4', client: 'Client 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
  { position: 5, name: 'Program 5', client: 'Client 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
  { position: 6, name: 'Program 6', client: 'Client 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
  { position: 7, name: 'Program 7', client: 'Client 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
];

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'client', 'description'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  animal: string;
  name: string;

  constructor(public dialog: MatDialog, public clientDialog: MatDialog, public programDialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogAddNewClient(): void {
    const dialogRef = this.clientDialog.open(AddClientDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogAddNewProgram(): void {
    const dialogRef = this.programDialog.open(AddProgramDialogComponent);

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        const ids = this.dataSource.data.map(id => id.position);
        const max_id = ids.length > 0 ? Math.max(...ids) : 0;

        const newRow: PeriodicElement = {
          position: max_id + 1,
          name: result.programNameValue,
          client: result.selectedClientValue,
          description: result.programNameDescription
        };

        this.dataSource.data.push(newRow);
        const newData = [...this.dataSource.data];
        this.dataSource.data = [];
        this.dataSource.data = newData;

        this.displaySuccessNotification(newRow.name);
        this.animal = result;
      }
    });
  }

  displaySuccessNotification(programName: string) {
    const type = 'info';
    const from = 'bottom';
    const align = 'right';

    $.notify(
      {
        icon: 'notification',
        message: '<b>New Program</b> : ' + programName + ', is added successfully</b>'
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
