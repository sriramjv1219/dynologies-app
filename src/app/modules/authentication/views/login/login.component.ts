import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    //Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ])

  matcher = new MyErrorStateMatcher();
  userEmailId: string;
  userPassword: string;
  isLoginButtonDisabled: boolean = true;
  hide: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('userToken')) {
      this.router.navigate(['dashboard']);
    }
  }

  onChangePasswordField(userName, password) {
    this.validateInputsForSignIn(userName, password);
  }

  onChangeEmailIdField(userName, password) {
    this.validateInputsForSignIn(userName, password);
  }

  validateInputsForSignIn(userName, password) {
    if (userName && this.emailFormControl.valid) {
      if (password) {
        this.isLoginButtonDisabled = false;
      }
      else {
        this.isLoginButtonDisabled = true;
      }
    }
    else {
      this.isLoginButtonDisabled = true;
    }
  }

  onLoginButtonClick(userName, password) {
    sessionStorage.setItem('userToken', 'tokenValue');
    this.router.navigate(['dashboard']);
  }

}
