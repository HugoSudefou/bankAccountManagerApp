import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { AuthenticationService } from '../../providers/http-service/http-service';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  providers: [
    AuthenticationService
  ]
})
export class LoginPageModule {}
