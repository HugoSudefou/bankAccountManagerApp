import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationService } from '../../providers/http-service/http-service';
import { HomePage } from '../home/home';

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
  providers: [ AuthenticationService ]
})
export class LoginPage {
  user: {email: string, password: string};

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: AuthenticationService) {
    if (localStorage.currentUser) this.navCtrl.push(HomePage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logForm(form) {
    this.user = form.value;
    let testApi = this.api.login(this.user);
    testApi.subscribe(
      data => {
        this.navCtrl.push(HomePage)
      },
      error => {
        console.log('error ')
        console.log(error)
      });
  }

}
