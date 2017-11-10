import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { AuthenticationService } from '../../providers/http-service/http-service';

/**
 * Generated class for the ProfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
  providers: [ AuthenticationService ]
})
export class ProfilPage {
  user: {
    email: string,
    first_name: string,
    last_name: string
  }
  userEdit: {
    email: string,
    first_name: string,
    last_name: string
  }
  regex: string= "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])"
  bool1: boolean = true
  bool2: boolean = true
  bool3: boolean = true

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public api: AuthenticationService, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.user = this.userEdit = JSON.parse(localStorage.currentUser)
    console.log(this.user)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

  openMenu() {
    this.menuCtrl.open()
  }

  sendEditUser(emailChange) {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Update de votre compte en cour'
    });
    let toastEmail = this.toastCtrl.create({
      message: "L'email n'est pas bon",
      duration: 3000
    });
    let toastNom = this.toastCtrl.create({
      message: "Il ne peut pas y avoir de chiffre dans un nom ou prénom",
      duration: 3000
    });
    let toastAutrePb = this.toastCtrl.create({
      message: "Il y a eu un problème lors de la modification du profil",
      duration: 3000
    });
    let bool = true;
    if(emailChange && !this.userEdit.email.match(this.regex)) {
      this.userEdit.email = this.user.email
      toastEmail.present();
      bool = false
    }
    else if(!emailChange && ( !this.userEdit.last_name.match(/^[a-zA-Z]*$/) || !this.userEdit.first_name.match(/^[a-zA-Z]*$/))){
      this.userEdit.last_name = this.user.last_name
      this.userEdit.first_name = this.user.first_name
      bool = false
      toastNom.present();
    }
    if(bool){
      loading.present();
      let updateUser = this.api.updateUser(this.user);
      updateUser.subscribe(
        data => {
          console.log('Success')
          loading.dismiss();
          this.user = this.userEdit
        },
        error => {
          console.log('error ')
          console.log(error)
          loading.dismiss();
          toastAutrePb.present()
        });
    }
  }

}
