import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/user_interface';
import { AuthLoginProvider } from '../../providers/auth-login/auth-login';
import { Storage } from '@ionic/storage';
import jwt_decode from 'jwt-decode';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user:User={
    email:'',
    password:''
  };
  userValid = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private AuthLogin: AuthLoginProvider, private storage: Storage) {
    this.user={
      email:'',
      password:''
    }
    this.userValid = 0;
  }

  doLogin(){
    let dataLogin = {
      email:this.user.email,
      password:this.user.password
    }
    
    this.AuthLogin.doLogin(dataLogin).then(data => {
      if(data.token){
        let token = jwt_decode(data.token);
        token.token = data.token;
        console.log("token<<<<<",token);
        this.storage.set("sessData",token);
        this.userValid = 1;
        this.navCtrl.push("AccountPage");
      }else{
        this.userValid = 2;
      }
    }).catch(err => {
      this.userValid = 2;
    });
  }

  goRegister(){
    this.navCtrl.push("RegisterPage");
  }

  validForm(){
    return this.user.email == "" || this.user.password == "";
  }

}
