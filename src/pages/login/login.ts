import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/user_interface';
import { AuthLoginProvider } from '../../providers/auth-login/auth-login';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private AuthLogin: AuthLoginProvider) {
    this.user={
      email:'',
      password:''
    }
  }

  doLogin(){
    let dataLogin = {
      email:this.user.email,
      password:this.user.password
    }
    
    this.AuthLogin.doLogin(dataLogin).then(data => {
      console.log("Respuesta del endpoint de logueo<<<<<<",data);
    }).catch(err => {
      console.log(err)
    });
  }

  goRegister(){
    this.navCtrl.push("RegisterPage");
  }

  validForm(){
    return this.user.email == "" || this.user.password == "";
  }

}
