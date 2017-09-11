import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FriendsprofilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-friendsprofile',
  templateUrl: 'friendsprofile.html',
})
export class FriendsprofilePage {
  
   user:any;
   username : string;
   designation :string;
   email : string;
   mobile : string;
   company : string;
   course : string;
   profile_pic:string = "http://bluesys.in/dev/mschoolbackend/public/images"; //"assets/img/default_user.png";


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    this.user = this.navParams.get('user');
     console.log(this.user);
     this.profile_pic = (this.user.profileimage=='')? 'assets/img/default_user.png' : this.profile_pic+"/"+this.user.profileimage;
     this.username = this.user.first_name+" "+this.user.last_name;
     this.designation = this.user.designation;
     this.email = this.user.email;
     this.mobile = this.user.mobile;
     this.company = this.user.company;
     this.course = this.user.course;


    console.log('ionViewDidLoad FriendsprofilePage');
  }

}
