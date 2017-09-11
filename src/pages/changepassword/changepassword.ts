import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController,LoadingController,ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { LoginPage} from '../login/login';
/**
 * Generated class for the ChangepasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
   userid:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,private rest : RestProvider,public loadingCtrl: LoadingController,private toastCtrl: ToastController,private storage: Storage) {
   this.storage.get('student').then((user) => {
     let user_data = JSON.parse(user);
     this.userid = user_data.id;
        
     });

  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }


  changePassword(){
      let prompt = this.alertCtrl.create({
      title: 'Change Password',
      message: "Enter New password",
      inputs: [
        {
          type: 'password',
          name: 'password',
          placeholder: "Enter New password",
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log(data);
          }
        },
        {
          text: 'Save',
          handler: data => {
            data.id = this.userid;
            this.updatePassword(data);
          }
        }
      ]
    });
    prompt.present();
  

  }
  
  updatePassword(data){
  this.rest.updatePassword(data).subscribe(data=>{

    if(data.status=="success"){

     
    
     this.storage.clear();
     this.navCtrl.setRoot(LoginPage);

  
   }
   
    this.toastCtrl.create({
              message: data.message,
              duration: 5000,
              position: 'bottom'
            }).present();


   },error=>{



   },()=>{



   });

   }
}
