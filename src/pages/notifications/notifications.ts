import { Component } from '@angular/core';
import {  NavController, NavParams ,ToastController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { END_POINTS } from '../../config'; 
import  moment  from 'moment';

import { PostdetailsPage } from '../postdetails/postdetails';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  user_id:number;
  items:string;
  imageUrl :string = END_POINTS.postUrl;
  profile_imageurl: string = END_POINTS.imageUrl;
  posts: Array<{id:string, description:string, images:string, hasimage:boolean; user_name:string, created_at:string,user_id:number,first_name:string,last_name:string,totalcomment:string,user_profile_image:string}>;
  constructor(public navCtrl: NavController,public toast:ToastController, public navParams: NavParams,public rest:RestProvider) {
    
    this.user_id= this.navParams.get('user_id');
    this.items ="";
    this.posts = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');

    this.rest.getNotifications(this.user_id).subscribe(data=>{
   
   this.items=data;

    },error=>{
    	 this.toast.create({
            message: `Something went wrong`,
            duration: 3000,
            position: 'bottom',
            showCloseButton : true,
            
          }).present();


    },()=>{


    })


  }


  getPost(postid,noti_id){
   if(postid != null || postid != ""){

     
   

   this.rest.getPost(postid).subscribe(data=>{
    
     let lenght = data.length;
            
         for (let i = 0; i < lenght; i++) {
           //console.log(typeof(data.posts[i]['id']));
           //console.log( data.posts[i]['id']+" D = "+data.posts[i]['description']);
           this.posts.push({
              id: data[i]['id'],
              description:data[i]['description'],
              images: this.imageUrl+"/"+data[i]['images'],
               hasimage:(data[i]['images']=="")? false : true,
              user_name: data[i]['user_name'],
              created_at:moment(data[i]['created_at']).calendar(), //data.posts[i]['created_at']
              user_id : data[i]['userid'],
              first_name : data[i]['first_name'],
              last_name : data[i]['last_name'],
              totalcomment:data[i]['totalcomment'],
              user_profile_image : (data[i]['profileimage']=='')?'assets/img/default_user.png' : this.profile_imageurl+"/"+data[i]['profileimage'],
             });

          
        
        }
      
      this.readNotification(noti_id);
       this.navCtrl.push(PostdetailsPage,{data:this.posts[0]});
      

   },error=>{

   },()=>{


   });

   
  }else{
    this.readNotification(noti_id);
  }
 

  }


  readNotification(noti_id){

    
this.rest.readNotification(noti_id).subscribe(data=>{


   },error=>{

   },()=>{


   });


  }


  clearNotification(){

    this.rest.clearNotification(this.user_id).subscribe(data=>{

     this.items ="";

   },error=>{

   },()=>{


   });


  }

}
