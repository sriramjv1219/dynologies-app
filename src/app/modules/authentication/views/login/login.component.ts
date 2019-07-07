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
  userEmailId: string = "Firstuser";
  userPassword: string = "Password";
  isLoginButtonDisabled: boolean = false;
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

    // tslint:disable-next-line: max-line-length
    let loginResponse = { "access_token": "eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIn0.2RUl12-J8UZAvAZEC1Lv6IC1UoqxcTLsCYmI_R6VJ12_HKJvinrzPw.hzTfmSc4oJYkJbRqqLwoMw.veeyqoz0SofHs1B0sZ-JltY-w5GKY874B5UWfXptwSegN-bxm6Q6clU8l4_WzFe-swY9h7lU36BccjVIO-zHPqOK5kk8ZhmfZ4LcC7mjH0Fnfn6OFHYyT0ToG0vqsX4J0bodbwWV7NRkblYg09YiGx5fSkNwSNtRH97lLkl91g5AI3eah91DhbdG37yq59lF8w2AK6wL-R-RPvo-Nge1pJOfHAKhg-eXFfwMiEf8An4NkDT_BjPRgF357oHIXvOAYNEYLleiBVTdVO7I5Y-8rE0FakF-NejZbzb-xoctpcd75ZxN_lH7GskPsYmI6SkbLtYJmH2GITJ8Fjq2DatOq2XRWOKHKWmsMnlBy9UzYMlnKcYKabzG4K8T0tLEOYY49RC8nV9wnwB4F5hNLlsdUGn2iYhHKIpDHIg_vOUx6LcQjNRoi2IwSDYh13B3vm0q2OappSVl_Kecpdf-23k3zBxjHFZ0jyvX-Z5RNjk9vQc8bvef1s8udI5sP_fEs2tgJ_9dpRP29-QjiJXmOxFS_cu9-j61wwpoo8soLi7xs2ImHvrHDeFY0EEDLL30ZDDIiu3Fsmf1OSXJsBr7C1AuzqOyunjy27MVy_iaW0h77UOOrLv5kxgqSAsIL1RfLkpx.6PV5yJZ6cnNewPuPAs8x5Q", "token_type": "bearer", "expires_in": 1799, "refresh_token": "teE4AF1T-Z8nHUODBA2O8q5AcKA0ZH1lLIynPu_Uai4" };
    sessionStorage.setItem('currentUser', JSON.stringify(loginResponse));
    this.router.navigate(['dashboard']);

    // this.authenticationService.login(requestObj).subscribe(loginResponse => {

    //   console.log(JSON.stringify(loginResponse));
    //   sessionStorage.setItem('currentUser', JSON.stringify(loginResponse));
    //   this.router.navigate(['dashboard']);

    // }, error => {

    //   console.log(error);
    //   if (error instanceof HttpErrorResponse) {
    //     if (error.status === 400) {
    //       const errorObj = JSON.parse(error.error.error);
    //       console.log(errorObj)
    //       this.errorMessage = errorObj['error_description'];
    //       // access_failed_count
    //       // is_locked
    //       this.displayProgressBar = false;
    //     }
    //   }
    // });
  }
}
