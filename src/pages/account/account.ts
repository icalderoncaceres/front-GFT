import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SessionData } from '../../interfaces/session_interface';
import { AccountProvider } from '../../providers/account/account';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  //sessData es el objeto local en donde se almacena los datos del usuario que inicio session, accounts es la lista de cuentas traidas por el endpoint
  sessData: SessionData;
  accounts = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage, private accountProvider: AccountProvider) {
    this.sessData = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      id: "",
      token: ""
    };

    this.loadData();

  }
  /*
  Método que no recibi atributos ni devuelve valores
  Busca en el storage los datos de la session los cuales al ser capturados, es decir, al resolver la promesa llama al método
  del provider account encargado de listar las cuentas del usuario lo cual es almacenado en "accounts" el cual es el objeto que
  se recorre en la vista para pintar las cuentas del usuario.
  */
  loadData(){
    //Capturamos la variable de session del storage
    this.storage.get('sessData').then(data => {
      this.sessData = data;
      let dataSend = {
        "token":this.sessData.token
      };
      //Llamamos al endpoint de listar las cuentas
      this.accountProvider.index(dataSend).then(data => {        
        //Resuelta la promesa almacenamos la lista de cuentas devueltas en el objeto que se recorre para pintar en la vista
        this.accounts = data.response;
      }).catch(xhr => {
        console.log(xhr);
      });  
    }).catch(err => {
      //Si no se encuentra almacenado en storage los datos del usuario se redirecciona al home
      this.navCtrl.push("TabsPage");
    });    
  }

  addAccount(){
    this.navCtrl.push("AccountFormPage");
  }

}
