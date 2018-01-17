import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController,ToastController} from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  email:string;
  loader:any;
  constructor(public navCtrl: NavController, public navParams: NavParams , public loadingCtrl: LoadingController,private toastCtrl: ToastController,public rest : RestProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ForgotpasswordPage');
  }


  /* for loading  */
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      spinner:'dots',
      });
    this.loader.present();
    }


 resetPassword(){
 this.presentLoading();
 this.rest.resetPassword(this.email).subscribe(data=>{

  this.toastCtrl.create({
              message: data.message,
              duration: 5000,
              position: 'top'
            }).present();

 },error=>{

 this.toastCtrl.create({
              message: 'Network Error',
              duration: 5000,
              position: 'top'
            }).present();
          this.loader.dismiss(); 
 },()=>{
   this.loader.dismiss(); 
 });
  //console.log(this.email);

 }


}
