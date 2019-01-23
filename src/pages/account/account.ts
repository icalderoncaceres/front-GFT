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

  ionViewDidLoad() {
    
  }

  loadData(){
    this.storage.get('sessData').then(data => {
      this.sessData = data;
      let dataSend = {
        "token":this.sessData.token
      };
      this.accountProvider.index(dataSend).then(data => {        
        this.accounts = data.response;
      }).catch(xhr => {
        console.log(xhr);
      });  
    }).catch(err => {
      this.navCtrl.push("TabsPage");
    });    
  }

  addAccount(){
    this.navCtrl.push("AccountFormPage");
  }

}
