import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/user_interface';
import { TabsPage } from '../tabs/tabs';
import { AuthLoginProvider } from '../../providers/auth-login/auth-login';
import { Storage } from '@ionic/storage';
import jwt_decode from 'jwt-decode';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private AuthLogin: AuthLoginProvider, private storage: Storage) {
  }

  //Llama al método encargado de consumir el endpoint de registro
  doRegister(){
    this.AuthLogin.doRegister(this.user).then(data => {
      //Si el registro es exitoso se llama a login (este código se puede refactorizar)    

      let dataLogin = {
        email:this.user.email,
        password:this.user.password
      }
      //Se llama al provider para que realice la petición
      this.AuthLogin.doLogin(dataLogin).then(data => {
        //Una vez resulta la promesa se valida que exista un token, posiblemente no sea necesario
        if(data.token){
          //Se descodifica el token utilizando la libreria seleccionada, se almacena en storage y se redirecciona a la lista de cuentas
          let token = jwt_decode(data.token);
          token.token = data.token;
          //Se almacena todos los datos de la sessión, no solo el ID
          this.storage.set("sessData",token);
          this.navCtrl.push("AccountPage"); //Redirección a la lista de cuentas
        }
      }).catch(err => {
        console.log(err);
      });

      this.token = data.token;
    }).catch(err => {
      console.log(err);
    })
  }

  goLogin(){
    this.navCtrl.setRoot(TabsPage)
  }

  //Valida que el formulario no tenga campos vacios
  validForm(){
    return this.user.email == '' || 
           this.user.password == '' ||           
           this.user.firstname == '' ||
           this.user.lastname == '' ||
           this.user.password != this.confirmPassword ||
           this.confirmPassword == ''
  }
}
