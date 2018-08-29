import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { MesasProvider, RegisterCredentials} from '../../providers/mesas/mesas';
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
})
export class LoginPage {
  loading: Loading;

  RegisterCredentials: RegisterCredentials;

  constructor(private nav: NavController, private alertCtrl: AlertController, public service: MesasProvider, private loadingCtrl: LoadingController) {
    this.RegisterCredentials = new RegisterCredentials();

   }

  public createAccount() {
    this.nav.push('RegisterPage');
  }

  public login() {

    this.showLoading()
    
    this.service.login(this.RegisterCredentials).then(allowed => {
      console.log(allowed);
      if(allowed != 'invalido'){
        this.loading.dismiss();
        this.nav.setRoot(HomePage, allowed); 
      }else{
        this.showError("Login Inválido")
      }
        
     
    }).catch(error => { console.log(error) });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Ops...',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
    this.loading.dismiss();
  }
}
