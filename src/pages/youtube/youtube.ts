import { Component } from '@angular/core';
import { NavController, NavParams  , LoadingController , ToastController} from 'ionic-angular';
import { YoutubeProvider } from '../../providers/youtube/youtube';
import { Observable  } from 'rxjs/Observable';
 
import { PlaylistPage } from '../playlist/playlist'; 
/**
 * Generated class for the YoutubePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-youtube',
  templateUrl: 'youtube.html',
})
export class YoutubePage {

  playList : Observable<any[]> ;
  loader:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public youtubeProvider : YoutubeProvider , public loadingCtrl : LoadingController,private toastCtrl: ToastController) {
   this.getPlaylist();

  }
  
 
   /* for loading  */
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      spinner:'dots',
      });
    this.loader.present();
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad YoutubePage');
  }

  getPlaylist(){
    this.presentLoading();
   this.playList =  this.youtubeProvider.getPlaylist();
   this.playList.subscribe(data=>{

   console.log(data);

   },error=>{

    this.toastCtrl.create({
              message: 'Network Error',
              duration: 5000,
              position: 'top'
            }).present();

    this.loader.dismiss(); 
   },()=>{
    this.loader.dismiss(); 

   });

   


  }

  openPlaylist(id:any,title:string){

   this.navCtrl.push(PlaylistPage,{id : id, title : title} );
   console.log(id);

  }


}
