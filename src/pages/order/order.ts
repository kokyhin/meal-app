import { Component, ElementRef } from '@angular/core';
import { IonicPage, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { each } from 'lodash'

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  day = null;
  myDate;
  tabs;

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    private _elementRef : ElementRef,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
  ) {
    this.myDate = this.getCurrentDay(new Date());
  }

  getCurrentDay(date) {
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  ionViewDidLoad() {
    this.getOrder(this.myDate, null);
    this.getTabs(this.myDate);
  }

  getOrder(date, ev) {
    if (ev) {
      each(this._elementRef.nativeElement.querySelectorAll('.weekday'), (el) => el.classList.remove('active'));
      ev.currentTarget.classList.add('active');
    }
    const loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    this.http.get(`http://meal.fusionworks.md/api/order/get-day/${date}`).subscribe(
      (response) => {
        this.day = response;
        loading.dismiss();
      },
      (error) => {
        const alert = this.alertCtrl.create({
          title: 'Fetch order fail',
          message: error.error ? error.error.message : error.message,
          buttons: ['Ok']
        });
        loading.dismiss();
        alert.present();
      }
    )
  }

  getTabs(date) {
    this.http.get(`http://meal.fusionworks.md/api/order/get-mobile-week/${date}`).subscribe(
      (response) => {
        this.tabs = response;
      },
      (error) => {
        const alert = this.alertCtrl.create({
          title: 'Fetch tabs fail',
          message: error.error ? error.error.message : error.message,
          buttons: ['Ok']
        });
        alert.present();
      }
    )
  }

  updatePage(refresher) {
    this.http.get(`http://meal.fusionworks.md/api/order/get-day/${this.day.date}`).subscribe(
      (response) => {
        this.day = response;
        refresher.complete();
      },
      (error) => {
        refresher.complete();
        const alert = this.alertCtrl.create({
          title: 'Fetch order fail',
          message: error.error ? error.error.message : error.message,
          buttons: ['Ok']
        });
        alert.present();
      }
    )
  }

  increase(course) {
    ++this.day[course].value;
    this.day.total = this.day.total + (course == 'first' ? 10 : 30);
  }

  decrease(course) {
    if (this.day[course].value == 0) return;
    --this.day[course].value;
    this.day.total = this.day.total - (course == 'first' ? 10 : 30);
  }

  submit() {
    const order = {
      _id: this.day._id,
      date: this.day.date,
      options: {first: [], second: []},
      order: {
        first: this.day.first,
        second: this.day.second
      }
    };
    this.http.post('http://meal.fusionworks.md/api/order', order).subscribe(
      (response) => {
        // this.day = response;
        let toast = this.toastCtrl.create({
          message: 'Your order was successfully saved',
          position: 'middle',
          duration: 2000
        });
        toast.present();
      },
      (error) => {
        const alert = this.alertCtrl.create({
          title: 'Order save Fail',
          message: error.error ? error.error.message : error.message,
          buttons: ['Ok']
        });
        alert.present();
      }
    )
  }
}
