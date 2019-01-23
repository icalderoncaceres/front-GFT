import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

//Las constantes trae la dirección de los endpoints y sus nombres
import { SERVER_URL, SERVER_ENDPOINTS } from '../../helpers/constants';

@Injectable()

export class AccountProvider {

  constructor(
    public http: Http
  ) {
  }

  /**
   * 
   * @param data objeto JSON con el token del usuario
   * Crea la cabecera de la petición y form la URL basado en las constante
   * Consulta el endpoint que trae la lista de cuentas y Devuelve una promesa
   */
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

  /**
   * Crea la cabecera de la petición y form la URL basado en las constante
   * Consulta el endpoint que trae la lista de catalogos y Devuelve una promesa
   */
  getCards() {
    let url = `${SERVER_URL}${SERVER_ENDPOINTS.CATALOGS_CARDS}`;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let opts = new RequestOptions({ headers: headers });
    return this.http.get(url, opts)
      .map(res => res.json())
      .toPromise();      
  }

  /**
   * @param data objeto json con los datos a ser enviados al endpoint ademas del token del usuario
   * Crea la cabecera de la petición y form la URL basado en las constante
   * Consulta el endpoint que crea la cuenta y Devuelve una promesa
   */
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