import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { CoursedetailsPage } from '../coursedetails/coursedetails';

/**
 * Generated class for the CoursesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-courses',
  templateUrl: 'courses.html',
})
export class CoursesPage {
   loader:any;
   courselist: any;

  constructor(public navCtrl: NavController, private rest : RestProvider, public navParams: NavParams ,public loadingCtrl: LoadingController) {
  }
 
  ionViewDidLoad() {
   this.getCourses();
    console.log('ionViewDidLoad CoursesPage');
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      spinner:'dots',
      });
    this.loader.present();
    }


  getCourses(){
   this.presentLoading();
   this.rest.getCourses().subscribe(data => {
    //console.log(data);
    this.courselist=data;
     },
    error => {
            alert('error');
          this.loader.dismiss(); 
    },
    () => this.loader.dismiss()
    )
  }


  goto(value:any){

   this.navCtrl.push(CoursedetailsPage, value);
  }

}
