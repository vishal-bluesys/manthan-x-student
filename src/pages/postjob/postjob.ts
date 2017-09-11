import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the PostjobPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-postjob',
  templateUrl: 'postjob.html',
})
export class PostjobPage {
  tabs : string ="primary";

  primaryInfo : FormGroup;
  secondaryInfo : FormGroup;
   isDisabled : any = true;
    loader:any;
    userid : any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,  fb: FormBuilder ,private rest : RestProvider, public loadingCtrl: LoadingController,private toastCtrl: ToastController) {
     this.primaryInfo = fb.group({
          'jobtitle' : [null,  Validators.required],
          'designation' : [null, Validators.required],
          'company' :  [null, Validators.required],
          'city':[null, Validators.required],
          'website' :  [null , Validators.required],
          'email' : [null],
          'phone' :[null],
          })
   
     this.secondaryInfo = fb.group({
          'experince' : [null,  Validators.required],
          'skills' : [null, Validators.required],
          'jobd' :  [null, Validators.required],
           })

    this.userid = this.navParams.get('userid');
    console.log(this.userid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostjobPage');
  }

  /* for loading  */
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      spinner:'dots',
      });
    this.loader.present();
    }

 checkPrimary(){
  if(this.isDisabled){
   this.tabs = "primary";
   alert("please fill primary details completely");


  }else{
  // alert(this.isDisabled);

  }
  
 }


 saveAndNext(primaryInfo:any){

   console.log();
   this.isDisabled=false;
   this.tabs = "secondary";
 }


 postJob(data:any){

  this.presentLoading();
 data.jobtitle = this.primaryInfo.value.jobtitle;
 data.designation = this.primaryInfo.value.designation;
 data.company = this.primaryInfo.value.company;
 data.city = this.primaryInfo.value.city;
 data.website = this.primaryInfo.value.website;
 data.email = this.primaryInfo.value.email;
 data.phone = this.primaryInfo.value.phone;

 

 console.log(data);
 console.log(this.userid);

  this.rest.postJob(data, this.userid).subscribe(data => {
      // Read the result field from the JSON response.
            
            this.toastCtrl.create({
              message: 'Job posted successfully',
              duration: 10000,
              position: 'bottom'
            }).present();

            this.primaryInfo.reset(); 
            this.secondaryInfo.reset(); 
    
    },
    error => {
           alert('error');
           this.loader.dismiss(); 
    },
    ()=>  this.loader.dismiss() 
    );



 }

}
