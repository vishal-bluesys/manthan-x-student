import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { END_POINTS } from '../../config'; 


import { PortfolioPage } from '../portfolio/portfolio';
import { TimelinePage } from '../timeline/timeline';


@Component({
  selector: 'page-friendsprofile',
  templateUrl: 'friendsprofile.html',
})
export class FriendsprofilePage {
  
   user:any;
   user_id:any;
   username : string;
   designation :string;
   email : string;
   mobile : string;
   company : string;
   course : string;
   yrsofpass : string;
   profile_pic:string = END_POINTS.imageUrl; //"assets/img/default_user.png";
   cover_pic:string = END_POINTS.imageUrl; //"assets/img/default_user.png";


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    this.user = this.navParams.get('user');
     //console.log(this.user);
     this.user_id = this.user.id;
     this.profile_pic = (this.user.profileimage=='')? 'assets/img/default_user.png' : this.profile_pic+"/"+this.user.profileimage;
     this.cover_pic = (this.user.coverimage==""|| this.user.coverimage==undefined ) ? 'assets/img/default_cover.jpg' : this.cover_pic+"/"+this.user.coverimage;
     this.username = this.user.first_name+" "+this.user.last_name;
     this.designation = this.user.designation;
     this.email = this.user.email;
     this.mobile = this.user.mobile;
     this.company = this.user.company;
     this.course = this.user.course;
     this.yrsofpass = this.user.yrsofpass;

  //  console.log('ionViewDidLoad FriendsprofilePage');
  }


  viewTimeline(id:number){

   console.log(id);

  this.navCtrl.push(TimelinePage,{'user_id':id,'username':this.username});

  }


  viewPortfolio(id){
     console.log(id);
   this.navCtrl.push(PortfolioPage,{'user_id':id,'username':this.username});
  }
  
  


}
