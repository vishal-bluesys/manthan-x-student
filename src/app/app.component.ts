import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { END_POINTS } from '../config'; 

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Storage } from '@ionic/storage';


import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { ContactusPage } from '../pages/contactus/contactus';
import { CoursesPage } from '../pages/courses/courses';
import { FriendsPage } from '../pages/friends/friends';
import { ProfilePage } from '../pages/profile/profile';
import { PostedjobsPage } from '../pages/postedjobs/postedjobs';
import { YoutubePage } from '../pages/youtube/youtube';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
   imagefile : string ; //="http://bluesys.in/dev/mschoolbackend/public/images"; //"assets/img/default_user.png";
   user_name : string;
   designation : string;
   coverpic :string;
   rootPage: any ;

  pages: Array<{title: string, component: any,icon:any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private storage: Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Blog', component: HomePage ,icon: 'logo-rss'},
      { title: 'Job Feed', component: ListPage ,icon: 'briefcase'},
      { title: 'My Posted jobs', component: PostedjobsPage ,icon: 'folder'},
      { title: 'Friends', component: FriendsPage ,icon: 'contacts'},
      { title: 'Course', component: CoursesPage ,icon: 'list'},
      { title: 'Youtube', component: YoutubePage ,icon: 'videocam'},
      { title: 'Contact Us', component: ContactusPage ,icon: 'call'},
      { title: 'About Us', component: AboutusPage ,icon: 'information-circle'},
      { title: 'Settings', component: ChangepasswordPage ,icon: 'settings'},
      
     
    ];

    

     

  }

  initializeApp() {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      this.storage.get('loggedIn').then((val) => {
        //console.log('logged In is', val);
         if(val){

         

          this.rootPage =  HomePage;

         }
         else{
          this.rootPage = LoginPage;

         }
      });

    });
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //console.log(page);
    this.nav.setRoot(page.component);
  }

  openProfile(){
   
     this.storage.get('student').then((user) => {
                 let user_data = JSON.parse(user);
                 this.nav.push(ProfilePage,{"user" : user_data,"isUpload":'true','isEdit':"true"});
           });



  }


  updateProfile(){

         this.storage.get('loggedIn').then((val) => {
        //console.log('logged In is', val);
         if(val){

         

          this.storage.get('student').then((user) => {
                 let user_data = JSON.parse(user);
                 this.imagefile =(user_data.profileimage=='')? 'assets/img/default_user.png' : END_POINTS.imageUrl+"/"+user_data.profileimage;
                 this.coverpic =(user_data.coverimage=='')? 'assets/img/default_cover.jpg' : END_POINTS.imageUrl+"/"+user_data.coverimage;
                 this.user_name = user_data.first_name+" "+user_data.last_name;
                 this.designation = user_data.designation; 
                 
           });

         }
      });

  
  }


  logout(){

 


             this.storage.clear();
  
             this.nav.setRoot(LoginPage);

  }

}
