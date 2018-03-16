import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { NgForm } from '@angular/forms';

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
    private alertCtrl: AlertController
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
    this.getOrder(this.myDate);
    this.getTabs(this.myDate);
  }

  getOrder(date) {
    this.http.get(`http://localhost:3000/api/order/get-day/${date}`).subscribe(
      (response) => {
        this.day = response;
      },
      (error) => {
        const alert = this.alertCtrl.create({
          title: 'Fetch order fail',
          message: error.error ? error.error.message : error.message,
          buttons: ['Ok']
        });
        alert.present();
      }
    )
  }

  getTabs(date) {
    this.http.get(`http://localhost:3000/api/order/get-mobile-week/${date}`).subscribe(
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
    this.http.get(`http://localhost:3000/api/order/get-day/${this.myDate}`).subscribe(
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

  submit(form: NgForm) {
    const order = {
      _id: this.day._id,
      date: this.day.date,
      options: {first: [], second: []},
      order: {
        first: this.day.first,
        second: this.day.second
      }
    };
    this.http.post('http://localhost:3000/api/order', order).subscribe(
      (response) => {
        this.day = response;
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
