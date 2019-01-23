import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//Las constantes trae la dirección de los endpoints y sus nombres
import { SERVER_URL, SERVER_ENDPOINTS } from '../../helpers/constants';

@Injectable()

export class AuthLoginProvider {

  constructor(
    public http: Http
  ) {
  }

  /**
   * @param data Objeto JSON con el email y el password del usuario
   * Crea las cabeceras del endpoint
   * Consulta el endpoint que consulta las credenciales de un usuario y Devuelve una promesa
   */
  doLogin(data) {

    let url = `${SERVER_URL}${SERVER_ENDPOINTS.AUTH_USER_AUTHENTICATE}`;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let opts = new RequestOptions({ headers: headers });
    return this.http.post(url, data, opts)
      .map(res => res.json())
      .toPromise();

  }

    /**
   * @param data Objeto JSON con los datos del usuario a ser agregado
   * Crea las cabeceras del endpoint
   * Consulta el endpoint que crea un usuario y Devuelve una promesa
   */

  doRegister(data){

    let url = `${SERVER_URL}${SERVER_ENDPOINTS.AUTH_USER_CREATE}`;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let opts = new RequestOptions({ headers: headers });
    return this.http.post(url, data, opts)
      .map(res => res.json())
      .toPromise();        
  }
}