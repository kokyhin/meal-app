import { OrderPage } from './../pages/order/order';
import { LoginPage } from './../pages/login/login';
import { Component, DoCheck } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements DoCheck {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private authService: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      authService.isAuth();
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  ngDoCheck() {
    if (this.authService.checkAuth()) {
      return this.rootPage = OrderPage;
    }
    this.rootPage = LoginPage;
  }
}

