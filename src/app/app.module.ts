import { CustomInterceptor } from './../shared/http-interceptor';
import { OrderPage } from './../pages/order/order';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MyApp } from './app.component';
import { AuthService } from '../services/auth';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    OrderPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    OrderPage
  ],
  providers: [
    StatusBar,
    Keyboard,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true},
    AuthService
  ]
})
export class AppModule {}
