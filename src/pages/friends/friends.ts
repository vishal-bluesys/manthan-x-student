import { Component } from '@angular/core';
import { NavController, NavParams , LoadingController} from 'ionic-angular';
import { END_POINTS } from '../../config'; 
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { FriendsprofilePage } from '../friendsprofile/friendsprofile';

/**
 * Generated class for the FriendsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
   loader:any;
   friendsList: any;
   user_id: any;
   profile_imageurl: string;
   //imagepath:any = "http://bluesys.in/dev/mschoolbackend/public/images"; 
  constructor(public navCtrl: NavController, public navParams: NavParams, private rest : RestProvider,public loadingCtrl: LoadingController,private storage: Storage) {
      this.profile_imageurl = END_POINTS.imageUrl;
  }

  ionViewDidLoad() {
   this.storage.get('user_id').then((val) => {
      this.user_id =  val;
      this.getUsers(val);
      console.log(this.profile_imageurl);
      });
     
    console.log('ionViewDidLoad FriendsPage');
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      spinner:'bubbles',
      });
    this.loader.present();
    }

  getUsers(id:any){

   this.presentLoading();
   this.rest.getAllusers(id).subscribe(data => {
    //console.log(data);
    this.friendsList=data;
    this.friendsList.forEach(function(item,value){
   
     // console.log(this.profile_imageurl);
      item.profile_image = (item.profileimage=="")? 'assets/img/default_user.png' :  "http://www.manthanartschool.com/app-rest-apis/mschoolbackend/public/images/"+item.profileimage;


    })

     },
    error => {
            alert('error');
          this.loader.dismiss(); 
    },
    () => this.loader.dismiss()
    )
     

  }


   openProfile(user){
   
    
                 
                 this.navCtrl.push(FriendsprofilePage,{"user" : user,"isUpload":'false','isEdit':"false"});
  
  
  

 }

}
