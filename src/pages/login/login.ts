import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: AuthenticationService, public loadingCtrl: LoadingController) {
    if (localStorage.currentUser) {
      this.api.getUser()
        .subscribe(test => this.navCtrl.push(HomePage))
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logForm(form) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Connection en cour'
    });
    loading.present();

    this.user = form.value;
    let login = this.api.login(this.user);
    login.subscribe(
      data => {
        console.log('Success')
        loading.dismiss();
        this.navCtrl.push(HomePage)
      },
      error => {
        console.log('error ')
        console.log(error)
        loading.dismiss();
      });
  }

}
