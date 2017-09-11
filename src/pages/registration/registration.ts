import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Registration2Page } from '../registration2/registration2';


/**
 * Generated class for the RegistrationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-registration',
   providers: [] ,
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  
  years : any = ['2001'] ;
  startedYear : any = 2001;
  today : any = new Date();
  currentYrs = this.today.getFullYear(); 
  difference : any = this.currentYrs - this.startedYear;
  registartionForm : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder ) {
   
    this.registartionForm = fb.group({
          'firstname' : [null,  Validators.required],
          'lastname' : [null, Validators.required],
          'course' :  [null, Validators.required],
          'yrsofpass':[null, Validators.required],
          'mobile' :  [null , Validators.required],
          'companyname' : [null],
          'designation' :[null],

          })
      
  


  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad RegistrationPage');
     // console.log(this.currentYrs);
      //console.log(this.today);
      for(let i = 1; i<=this.difference;i++){
     
       this.years.push(++this.startedYear);
      // console.log(this.years);
      }

 

  }

   saveAndNext(value: any){
     // console.log(value);
   
     this.navCtrl.push(Registration2Page, value);

  }

}
