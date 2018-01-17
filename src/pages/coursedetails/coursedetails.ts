import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CoursedetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-coursedetails',
  templateUrl: 'coursedetails.html',
})
export class CoursedetailsPage {
  
  title:any;
  duration: any;
  batches : any;
  details : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    this.title = this.navParams.get('title');
    this.duration = this.navParams.get('duration');
    this.batches = this.navParams.get('batches');
    this.details = this.navParams.get('details');

    //console.log('ionViewDidLoad CoursedetailsPage');
  }

}
