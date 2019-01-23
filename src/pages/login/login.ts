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
  /**
   * userValid representa el estado de la autenticación
   * 0 = No ha intentado autenticarse
   * 1 = Se autentico exitosamente
   * 2 = Se autentico erroneamente, en este estado muestra la barra de error
   */
  userValid = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private AuthLogin: AuthLoginProvider, private storage: Storage) {
    this.user={
      email:'',
      password:''
    }
    this.userValid = 0;
  }

  /*
  Llama al método del provider que ejecuta la autenticación del usuario
  No recibe parametros ni devuelve valores
  */
  doLogin(){
    //Se crea el json que se envia al provider
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
        this.userValid = 1;
        this.navCtrl.push("AccountPage"); //Redirección a la lista de cuentas
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
  //Validación del formulario, que no este vacio ningún campo
  validForm(){
    return this.user.email == "" || this.user.password == "";
  }

}