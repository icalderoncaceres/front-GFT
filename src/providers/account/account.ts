import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { SERVER_URL, SERVER_ENDPOINTS } from '../../helpers/constants';

@Injectable()

export class AccountProvider {

  constructor(
    public http: Http
  ) {
  }

  index(data) {

    let url = `${SERVER_URL}${SERVER_ENDPOINTS.ACCOUNTS}`;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-access-token', data.token);

    let opts = new RequestOptions({ headers: headers });
    return this.http.get(url, opts)
      .map(res => res.json())
      .toPromise();

  }

  getCards() {
    let url = `${SERVER_URL}${SERVER_ENDPOINTS.CATALOGS_CARDS}`;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let opts = new RequestOptions({ headers: headers });
    return this.http.get(url, opts)
      .map(res => res.json())
      .toPromise();      
  }

  addAccount(data){
    let url = `${SERVER_URL}${SERVER_ENDPOINTS.ACCOUNTS}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-access-token', data.token);
    
    let opts = new RequestOptions({ headers: headers });
    return this.http.post(url, data.data, opts)
      .map(res => res.json())
      .toPromise();        
  }
}