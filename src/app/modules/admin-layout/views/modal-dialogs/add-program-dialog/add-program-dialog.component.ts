import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, ErrorStateMatcher } from '@angular/material';
import { FormControl, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-add-program-dialog',
  templateUrl: './add-program-dialog.component.html',
  styleUrls: ['./add-program-dialog.component.scss']
})
export class AddProgramDialogComponent implements OnInit {

  programNameFormControl = new FormControl('', [
    Validators.required,
  ]);

  selectedClientValue: string;
  programNameValue: string;
  programNameDescription: string;

  constructor(
    public dialogRef: MatDialogRef<AddProgramDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  addProgram(): void {

    const data = {
      selectedClientValue: this.selectedClientValue,
      programNameValue: this.programNameValue,
      programNameDescription: this.programNameDescription
    };

    // tslint:disable-next-line: comment-format
    //API Call comes here for adding user.

    this.dialogRef.close(data);
  }
}
