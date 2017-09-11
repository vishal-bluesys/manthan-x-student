import { Component } from '@angular/core';
import { NavController, NavParams , LoadingController,ToastController,Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm';
import { Device } from '@ionic-native/device';
import { Network } from '@ionic-native/network';

import { RestProvider } from '../../providers/rest/rest';

import { HomePage } from '../home/home';
import { RegistrationPage } from '../registration/registration';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
   loginForm : FormGroup;
   loader:any;
   fcm_token : any;
   
  connected: any;
  disconnected : any;

  constructor(public platform: Platform,public navCtrl: NavController, public navParams: NavParams ,fb: FormBuilder,private rest : RestProvider,public loadingCtrl: LoadingController,private toastCtrl: ToastController,private storage: Storage,private fcm: FCM,private device: Device,public network : Network) {
      this.loginForm = fb.group({
          'email' : [null, Validators.compose([
                     Validators.required,
                     Validators.email

                    ])],
          'password': [null, Validators.required],
        })
      }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
     if( this.device.platform =="Android" || this.device.platform =="Ios" ){
       this.fcm.subscribeToTopic('xstudent');
    this.fcm.getToken().then(token=>{
           // alert(token);
         //  alert(JSON.stringify(token));
             this.storage.set('dtoken', token);
          this.fcm_token = token;
         
        });
        }
  }

  ionViewDidEnter(){
            this.connected = this.network.onConnect().subscribe(data=>{
            
             this.displayNetworkUpdate(data.type);
            },error=>{
                
                console.log(error);

            });

            
           this.disconnected = this.network.onDisconnect().subscribe(data=>{
               this.displayNetworkUpdate(data.type);

            },error=>{

               console.log(error);
            });


     }


      ionViewWillLeave(){
          this.connected.unsubscribe();
          this.disconnected.unsubscribe();
        }


     displayNetworkUpdate(connectionState: string){
      let networkType = this.network.type;

          this.toastCtrl.create({
            message: `You are now ${connectionState} via ${networkType}`,
            duration: 3000,
            position: 'bottom',
            showCloseButton : true,
            
          }).present();


     }


   /* for loading  */
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      spinner:'dots',
      });
    this.loader.present();
    }

   login(value: any){
    this.presentLoading();
    value.fcmtoken = this.fcm_token; 
    //alert(this.fcm_token);
    this.rest.login(value).subscribe(data => {
      // Read the result field from the JSON response.
      if(data.status=='success'){


           this.storage.set('student', JSON.stringify(data.student));
           this.storage.set('firstname', data.student.first_name);
           this.storage.set('lastname', data.student.last_name);
           this.storage.set('designation', data.student.designation);
           this.storage.set('user_id', data.student.id);
           this.storage.set('loggedIn',true);


            this.toastCtrl.create({
              message: 'Login successful',
              duration: 3000,
              position: 'bottom',
              cssClass: "success",
            }).present();

             this.navCtrl.setRoot(HomePage);
        }
        else{
            
            this.toastCtrl.create({
              message: 'Login Fail',
              duration: 10000,
              position: 'top'
            }).present();

        }
     
    },
    error => {
          this.toastCtrl.create({
              message: 'Network Error',
              duration: 5000,
              position: 'top'
            }).present();
          this.loader.dismiss(); 
    },
    () => this.loader.dismiss()
    );




  }


   registration(){
 this.navCtrl.push(RegistrationPage);

 }

 forgotPassword(){
 this.navCtrl.push(ForgotpasswordPage);

 }

}
