import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  firstNameFormControl = new FormControl('', [
    Validators.required,
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required,
  ]);

  programSelectionFormControl = new FormControl('valid', [
    Validators.required,
  ]);

  clientSelectionFormControl = new FormControl('valid', [
    Validators.required,
  ]);

  roleSelectionFormControl = new FormControl('valid', [
    Validators.required,
  ]);

  queueAssignmentFormControl = new FormControl();
  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  addUser(): void {

    const data = {
      selectedClientValue: this.clientSelectionFormControl.value,
      selectedProgramValue: this.programSelectionFormControl.value,
      firstNameValue: this.firstNameFormControl.value,
      lastNameValue: this.lastNameFormControl.value,
      emailIdValue: this.emailFormControl.value,
      selectedRoleValue: this.roleSelectionFormControl.value,
      queueAssignment: this.queueAssignmentFormControl.value,
    };
    this.dialogRef.close(data);
  }
}
