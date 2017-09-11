import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


import { RegistrationPage } from '../../pages/registration/registration';
import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(private fb: Facebook, private menu: MenuController, public navCtrl: NavController, public navParams: NavParams) {

       
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad WelcomePage');
     this.menu.swipeEnable(false, 'menu');
    
   
  }
   

  login(){
   this.navCtrl.push(LoginPage);

  }

 registration(){
 this.navCtrl.push(RegistrationPage);

 }

 loginWithFb(){
  
   this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
  .catch(e => console.log('Error logging into Facebook', e));


   //this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);

 }
  


}
