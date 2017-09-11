import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the ContactusPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {
  contact: any = 'Mumbai';
  Mlat: number = 18.9955301;
  Mlng: number = 72.8316386;
  Plat: number = 18.5041449;
  Plng: number = 73.8547848;
  constructor(public navCtrl: NavController, public navParams: NavParams,private callNumber: CallNumber) {

  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
  }

  callNow(phonenum:any){

   this.callNumber.callNumber(phonenum, true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));


  }

}
