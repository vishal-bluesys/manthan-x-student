import { Component } from '@angular/core';
import {  NavController, NavParams,Platform , LoadingController , ToastController } from 'ionic-angular';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { Observable  } from 'rxjs/Observable';

import { YoutubeProvider } from '../../providers/youtube/youtube';

/**
 * Generated class for the PlaylistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html',
})
export class PlaylistPage {

  videos: Observable<any[]>;
  loader:any;
  title :string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public plt : Platform, public youtubeVideoPlayer: YoutubeVideoPlayer , public youtubeProvider: YoutubeProvider, public loadingCtrl : LoadingController,private toastCtrl: ToastController) {
  
   this.presentLoading();
   let listId = this.navParams.get('id');
   this.title = this.navParams.get('title');
   this.videos = this.youtubeProvider.getVideolist(listId);
   this.videos.subscribe(data=>{
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

   /* for loading  */
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      spinner:'dots',
      });
    this.loader.present();
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaylistPage');
  }


 openVideo(video){
   if(this.plt.is('cordova') ){
    this.youtubeVideoPlayer.openVideo(video.snippet.resourceId.videoId);

   }else{
      
      window.open('https://www.youtube.com/watch?v='+video.snippet.resourceId.videoId);

    }

 }


}
