import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { LoginRequestModel } from 'app/models/requests/LoginRequestModel';
import { HttpErrorResponse } from '@angular/common/http';

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
    // Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ])

  matcher = new MyErrorStateMatcher();
  userEmailId: string;
  userPassword: string;
  isLoginButtonDisabled: boolean = true;
  passwordTextDisplayStatus: boolean = false;
  displayProgressBar: boolean = false;
  errorMessage: string;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    if (sessionStorage.getItem('currentUser')) {
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
      } else {
        this.isLoginButtonDisabled = true;
      }
    } else {
      this.isLoginButtonDisabled = true;
    }
  }

  onLoginButtonClick(userName, password) {

    const requestObj: LoginRequestModel = {
      UserName: userName,
      Password: password,
      Client_Id: 'd449b19980784a7d837bfc924b00e084',
      Grant_Type: 'password'
    };

    this.displayProgressBar = true;
    this.errorMessage = null;

    this.authenticationService.login(requestObj).subscribe(loginResponse => {

      console.log(loginResponse);
      sessionStorage.setItem('currentUser', JSON.stringify(loginResponse));
      this.router.navigate(['dashboard']);

    }, error => {

      console.log(error);
      if (error instanceof HttpErrorResponse) {
        if (error.status === 400) {
          const errorObj = JSON.parse(error.error.error);
          console.log(errorObj)
          this.errorMessage = errorObj['error_description'];
          // access_failed_count
          // is_locked
          this.displayProgressBar = false;
        }
      }
    });
  }
}
