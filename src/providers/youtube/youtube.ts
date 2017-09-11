import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the YoutubeProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class YoutubeProvider {
  url : string = "https://www.googleapis.com/youtube/v3/playlists?key=AIzaSyAkfgLs2DsDydLWApzmfFH6N_ULpmZ3K84&part=snippet,contentDetails&channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw";
 
  channelId = 'UCwovAt8w_2OmSFFl-q9ImMA​';
  apiKey:string = 'AIzaSyAkfgLs2DsDydLWApzmfFH6N_ULpmZ3K84';

  constructor(public http: Http) {
    console.log('Hello YoutubeProvider Provider');
  }


  getPlaylist(){

    return this.http.get('https://www.googleapis.com/youtube/v3/playlists?key='+this.apiKey+'&part=snippet,contentDetails&channelId='+this.channelId).map(res=>{
  
     return res.json()['items'];

    });


  }
 
    getVideolist(listid){

    return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?key='+this.apiKey+'&part=snippet,contentDetails&playlistId='+listid).map(res=>{
  
     return res.json()['items'];

    });


  }

}
