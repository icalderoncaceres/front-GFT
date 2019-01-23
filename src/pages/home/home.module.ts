import { NgModule } from '@angular/core';
import { IonicPageModule, IonicPage } from 'ionic-angular';
import { HomePage } from './home';
import { LoginPage } from '../login/login';
import { AuthLoginProvider } from '../../providers/auth-login/auth-login'
import { AccountProvider } from '../../providers/account/account';

@IonicPage()
@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    LoginPage
  ],
  providers: [
    AuthLoginProvider,
    AccountProvider,
  ],
})
export class LoginPageModule {}