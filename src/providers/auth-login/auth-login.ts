import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { SERVER_URL, SERVER_ENDPOINTS } from '../../helpers/constants';

@Injectable()

export class AuthLoginProvider {

  constructor(
    public http: Http
  ) {
  }

  doLogin(data) {

    let url = `${SERVER_URL}${SERVER_ENDPOINTS.AUTH_USER_CREATE}`;

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let opts = new RequestOptions({ headers: headers });

    let sendData = Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    }).join('&');

    return this.http.post(url, sendData, opts)
      .map(res => res.json())
      .toPromise();

  }

}