import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AUTH_BODY } from 'src/assets/authenticationBody';
import { MENU_BODY } from 'src/assets/getMenuBody';
import { environment } from 'src/environments/environment';
import { AppConstants } from '../../constants/appConstants';

@Injectable({
  providedIn: 'root',
})
export class DataClientService {
  private token: string = '';

  constructor(private http: HttpClient) { }

  getTokenClient(username: string, password: string) {
    const urlAuth = `${environment.host}/${environment.authenticationPath}`;
    const updatedBody = this.getUpdatedAuthBody();

    let AuthorizationData = 'Basic ' + btoa(username + ':' + password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', Authorization: AuthorizationData,
      }),
    };

    return this.http.post(urlAuth, updatedBody, httpOptions);
  }

  getUpdatedAuthBody() {
    let updatedBody = AUTH_BODY;
    let currTimestamp = Date.now();
    updatedBody.device.creationTime = currTimestamp;
    updatedBody.device.lastEditTime = currTimestamp;
    updatedBody.user.creationTime = currTimestamp;
    updatedBody.user.lastEditTime = currTimestamp;

    return updatedBody;
  }

  getMenuClient(token: string) {
    const urlMenu = `${environment.host}/${environment.batchPath}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', Authorization: token,
      }),
    };

    return this.http.post(urlMenu, MENU_BODY, httpOptions);
  }
}
