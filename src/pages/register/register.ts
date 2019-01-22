import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/user_interface';
import { TabsPage } from '../tabs/tabs';
import { AuthLoginProvider } from '../../providers/auth-login/auth-login';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user:User={
    email:'',
    password:''
  }
  confirmPassword="";
  token = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private AuthLogin: AuthLoginProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  doRegister(){
    this.AuthLogin.doRegister(this.user).then(data => {
      this.token = data.token;
    }).catch(err => {
      console.log(err);
    })
  }

  goLogin(){
    this.navCtrl.setRoot(TabsPage)
  }

  validForm(){
    return this.user.email == '' || 
           this.user.password == '' ||           
           this.user.firstname == '' ||
           this.user.lastname == '' ||
           this.user.password != this.confirmPassword ||
           this.confirmPassword == ''
  }
}
