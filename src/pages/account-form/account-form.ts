import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountProvider } from '../../providers/account/account';
import { SessionData } from '../../interfaces/session_interface';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { Type_card } from '../../interfaces/type_card_interface';
/**
 * Generated class for the AccountFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-form',
  templateUrl: 'account-form.html',
})
export class AccountFormPage {
  sessData: SessionData;
  cards=[];
  type_card:Type_card;
  constructor(public navCtrl: NavController, public navParams: NavParams, private accountProvider: AccountProvider, private storage:Storage, public alertCtrl: AlertController) {
    this.cards=[];
    this.loadData();
    this.sessData = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      id: "",
      token: ""
    };

  }
  /*
  Método encargado solicitar la creación de una cuenta, no recibe parametros ni devuelve valores
  */
  addAccount(){
    //Se crea un objeto json que sera enviado al proveedor encargado de hacer la petición
    let sendData = {
      data:{
        "userId": this.sessData.id,
        "type": this.type_card.type,
        "name": this.type_card.name  
      },
      token:this.sessData.token
    };

    //Se llama al método del provider account, encargado de consumir el endpoint de crear cuentas
    this.accountProvider.addAccount(sendData).then(data => {
      //En caso de ser resulta la promesa envia un mensaje
      const alert = this.alertCtrl.create({
        title: 'Felicitaciones',
        subTitle: 'Acabas de crear tu cuenta, por favor espera 24 horas',
        buttons: ['OK']
      });
      alert.present();      
    }).catch(err => {
      console.log(err);
    });
    
  }

  /*
  Encargado de invocar al método del provider account que lista los catalogos
  El resultado del endpoint se almacena en el objeto cards, el cual es recorrido por medio de un ngFor para llenar el selector de catalogos
  */
  loadData(){
    //Consultamos la variable de sessión, es importante hacerlo en cada proceso porque el usuario puede cerrar la sessión en otra pestaña
    //O limpiar la cache
    this.storage.get('sessData').then(data => {
      this.sessData = data;
      //Una vez seguros que existe session, llamamos al método encargado de hacer la petición
      this.accountProvider.getCards().then(data => {
        //Cuándo se resuleve la promesa se almacena la lista devuelta en el objeto cards
        this.cards = data.response.type_cards;
      }).catch(err => {
        console.log(err);
      });
    }).catch(err => {
      //En caso de no tener session mandamos al home
      this.navCtrl.push("TabsPage");
    });    

  }

  //Actualiza el estado del tipo de tarjeta seleccionada cuándo modifica el selector
  changeTypeCard(typeCard) {
    this.type_card = JSON.parse(typeCard);
  }

}
