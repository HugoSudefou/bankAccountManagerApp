import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public viewCtrl: ViewController) {

  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  openMenu() {
    this.menuCtrl.open()
  }

  logout(){
    localStorage.removeItem('currentUser')
    this.navCtrl.push(LoginPage)
  }

}
