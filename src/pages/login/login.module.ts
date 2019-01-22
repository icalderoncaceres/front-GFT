import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { AuthLoginProvider } from '../../providers/auth-login/auth-login';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  exports:[
    LoginPage
  ],
  providers: [
    AuthLoginProvider
  ]
})
export class LoginPageModule {}
