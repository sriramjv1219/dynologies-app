import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { LoginRequestModel } from 'app/models/requests/LoginRequestModel';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  httpHeaders: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.httpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    this.httpHeaders.append('Cache-control', 'no-cache');
  }

  login(loginCredentials: LoginRequestModel) {
    let serverURL: string = "http://iisserdyn.northcentralus.cloudapp.azure.com:8081/oauth2/token";
    let requestObj = {
      "client_id": loginCredentials.Client_Id,
      "grant_type": loginCredentials.Grant_Type,
      "username": loginCredentials.UserName,
      "password": loginCredentials.Password
    }

    const payload = new HttpParams()
      .set("client_id", loginCredentials.Client_Id)
      .set('grant_type', loginCredentials.Grant_Type)
      .set("username", loginCredentials.UserName)
      .set("password", loginCredentials.Password);

    return this.httpClient.post(serverURL, payload, { headers: this.httpHeaders });
  }
}
