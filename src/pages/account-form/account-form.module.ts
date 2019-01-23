import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountFormPage } from './account-form';

@NgModule({
  declarations: [
    AccountFormPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountFormPage),
  ],
  exports: [
    AccountFormPage
  ]
})
export class AccountFormPageModule {}
