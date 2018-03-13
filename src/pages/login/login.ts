import { OrderPage } from './../order/order';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController, NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
      private loadingCtrl: LoadingController,
      private authService: AuthService,
      private alertCtrl: AlertController,
      private navCtrl: NavController
    ) {
  }

  login(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    this.authService.signin(form.value).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.authService.token = `${response.token}`;
        this.navCtrl.setRoot(OrderPage);
        loading.dismiss();
      },
      (error) => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: error.error.message,
          buttons: ['Ok']
        });
        alert.present();
      }
    );
  }
}
