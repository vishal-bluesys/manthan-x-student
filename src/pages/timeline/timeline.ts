import { Component } from '@angular/core';
import {  NavController, NavParams ,ToastController} from 'ionic-angular';
import { END_POINTS } from '../../config'; 
import { RestProvider } from '../../providers/rest/rest';
import { PostdetailsPage } from '../postdetails/postdetails';
import moment from 'moment';

/**
 * Generated class for the TimelinePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html',
})
export class TimelinePage {
  user_id : number;
  username : string;
  page:number= 0;
  pagination : any = {"page":this.page,"perpage":5 , "searchText":""};
  imageUrl :string = END_POINTS.postUrl;
  profile_imageurl: string = END_POINTS.imageUrl;
  total : number;
  infiniteScroll:any=true;
  items: Array<{id:string, description:string, images:string, hasimage:boolean; user_name:string, created_at:string,user_id:number,first_name:string,last_name:string,totalcomment:string,user_profile_image:string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private toast : ToastController,public rest :RestProvider) {
    this.user_id = this.navParams.get('user_id');
    this.username = this.navParams.get('username');
      this.items =  []; 
  }

  ionViewDidLoad() {
  	 this.getPosts(this.pagination);
    console.log('ionViewDidLoad TimelinePage'+this.user_id+" "+this.username);
  }

  getPosts(pagination:any){

     
  
     this.rest.getTimelinePost(pagination,this.user_id).subscribe(data => {
         
        let lenght = data.posts.length;
        //console.log(data);
            //console.log("lenght"+lenght);
         for (let i = 0; i < lenght; i++) {

          // console.log(typeof(data.posts[i]['id']));
           //console.log( data.posts[i]['id']+" D = "+data.posts[i]['description']);
           this.items.push({
              id: data.posts[i]['id'],
              description:data.posts[i]['description'],
              images: this.imageUrl+"/"+data.posts[i]['images'],
               hasimage:(data.posts[i]['images']=="")? false : true,
              user_name: data.posts[i]['user_name'],
              created_at:moment(data.posts[i]['created_at']).calendar(),
              user_id : data.posts[i]['userid'],
              first_name : data.posts[i]['first_name'],
              last_name : data.posts[i]['last_name'],
              totalcomment:data.posts[i]['totalcomment'],
              user_profile_image : (data.posts[i]['profileimage']=='')?'assets/img/default_user.png' : this.profile_imageurl+"/"+data.posts[i]['profileimage'],
             });
        
        }

     
        this.page = 1;
        this.pagination.page = this.page;
       // console.log(this.page);
        this.total=data.total;
         },
        error => {
           this.toast.create({
            message: `error ${error}`,
            duration: 3000,
            position: 'bottom',
            showCloseButton : true,
            
          }).present();

             
        },
        () =>{}
        )
     

  


  }

   doInfinite(infiniteScroll){

      this.infiniteScroll = infiniteScroll;
      this.rest.getTimelinePost(this.pagination,this.user_id).subscribe(data => {
        
          let lenght = data.posts.length;
             console.log(lenght);
             for (let i = 0; i < lenght; i++) {
            this.items.push({
              id: data.posts[i]['id'],
              description:data.posts[i]['description'],
              images: this.imageUrl+"/"+data.posts[i]['images'],
              hasimage:(data.posts[i]['images']=="")? false : true,
              user_name: data.posts[i]['user_name'],
              created_at:moment(data.posts[i]['created_at']).calendar(),
              user_id : data.posts[i]['userid'],
              first_name : data.posts[i]['first_name'],
              last_name : data.posts[i]['last_name'],
              totalcomment:data.posts[i]['totalcomment'],
              user_profile_image : this.profile_imageurl+"/"+data.posts[i]['profileimage'],
            });
        
        }
           
        this.page = Number(this.page)+Number(1);
        this.pagination.page = this.page;
         console.log("page:"+this.page);
        this.total=data.total;

        let item_length = this.items.length;
        console.log(item_length);
        if(item_length ==  this.total){
          infiniteScroll.enable(false);

        }else{
        infiniteScroll.enable(true);
        }


         },
        error => {
                this.toast.create({
            message: `error ${error}`,
            duration: 3000,
            position: 'bottom',
            showCloseButton : true,
            
          }).present();
             
        },
        () =>{  infiniteScroll.complete();}
        )
     

  }

  doRefresh(refresher){
    this.items = [];
    this.pagination.page = 0;
    this.pagination.searchText="";
    if(this.infiniteScroll !=true){
       this.infiniteScroll.enable(true);
    }

   this.getPosts(this.pagination);
   refresher.complete();
  
  }


  showPost(post:any){
   this.navCtrl.push(PostdetailsPage,{data:post});


  }







}
