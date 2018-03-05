import { OrderPage } from './../order/order';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController, NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
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
      private navCtrl: NavController,
      private http: Http
    ) {
  }

  login(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    this.authService.signin(form.value).subscribe(
      (response) => {
        console.log(response.json())
        this.navCtrl.setRoot(OrderPage);
        loading.dismiss();
      },
      (error) => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: error._body,
          buttons: ['Ok']
        });
        alert.present();
      }
    );
  }
}
