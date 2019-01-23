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

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountFormPage');
  }

  addAccount(){
    console.log("cardaaaaa<<<<<<<<",this.type_card);
    let sendData = {
      data:{
        "userId": this.sessData.id,
        "type": "TDD",
        "name": "Tarjeta de Debito"  
      },
      token:this.sessData.token
    };
    console.log("sendData<<<<<<<<",sendData);
    
    this.accountProvider.addAccount(sendData).then(data => {
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

  loadData(){
    this.accountProvider.getCards().then(data => {
      console.log("Cardsss<<<<",data);
      this.cards = data.response.type_cards;
    }).catch(err => {
      console.log(err);
    });

    this.storage.get('sessData').then(data => {
      this.sessData = data;
    }).catch(err => {
      this.navCtrl.push("TabsPage");
    });    

  }

}
