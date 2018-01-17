import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

/**
 * Generated class for the JobdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-jobdetails',
  templateUrl: 'jobdetails.html',
})
export class JobdetailsPage {
  
              id : number;
              jobtitle : string;
              designation : string;
              company : string;
              city : string;
              email : string; 
              website : string; 
              phone : string; 
              experince : string; 
              skills : string;
              jobd : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private emailComposer: EmailComposer) {
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad JobdetailsPage');
    //console.log(this.navParams.get('jobtitle'));
    this.id = this.navParams.get('id');
    this.jobtitle = this.navParams.get('jobtitle');
    this.designation = this.navParams.get('designation');
    this.company = this.navParams.get('company');
    this.city = this.navParams.get('city');
    this.email = this.navParams.get('email');
    this.website = this.navParams.get('website');
    this.phone = this.navParams.get('phone');
    this.experince = this.navParams.get('experince');
    this.skills = this.navParams.get('skills');
    this.jobd = this.navParams.get('jobd');
  }

 applyJob(){

        	let email = {
				  to: this.email,
				  cc: 'manthanadvt@gmail.com',
				  subject: 'Application for Post of '+this.jobtitle,
				  body: 'Respected sir/madam, \n I am ',
				  isHtml: true
				};

            this.emailComposer.open(email);

 }


  





}
