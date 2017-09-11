import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
/**
 * Generated class for the PostdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-postdetails',
  templateUrl: 'postdetails.html',
})
export class PostdetailsPage {

  postdata :any ;
  editposttext :any = false;
  edit_description : any ;
  textcomment :any;
  userid : any;
  user_name : any;
  candelete : boolean;
  postComments : Array<{'comment_id':number, 'post_id':string, 'comment':string, 'c_user_name':string, 'c_user_id':string, 'created_at':string, 'flag':string} >;
  constructor(public navCtrl: NavController, public navParams: NavParams,public rest :RestProvider,public storage : Storage,private toastCtrl: ToastController) {
   //this.postComments = []; 
   console.log(this.navParams.get('data'));
    this.postdata = this.navParams.get('data');
    console.log("post id" + this.postdata.id);
    this.getComments(this.postdata.id);

    this.storage.get('student').then((user) => {
     let user_data = JSON.parse(user);
     this.userid = user_data.id;
     this.user_name = user_data.first_name+" "+ user_data.last_name; 
     this.candelete = (this.postdata.user_id == this.userid) ? true : false;
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostdetailsPage');
  }
  


  getComments(postid){
   this.postComments = []; 
   this.rest.getBlogPostComments(postid).subscribe(data=>{
      
      console.log(data);
      let length = data.length;

      console.log(length);
     for(let i=0; i< length; i++){
      console.log(data[i]['comment_id']);
       this.postComments.push({
          comment_id : data[i]['comment_id'],
          post_id : data[i]['post_id'],
          comment : data[i]['comment'],
          c_user_name : data[i]['c_user_name'],
          c_user_id : data[i]['c_user_id'],
           created_at : data[i]['created_at'],
           flag : data[i]['flag']});
      }
     


   }, error => {
      console.log(error);
   }, () => {});

   



  }

  postComment(){

  console.log(this.textcomment);
  let data = {'post_id':this.postdata.id , 'comment':this.textcomment , 'c_user_name': this.user_name ,'c_user_id':this.userid};
  this.rest.addComment(data).subscribe(data=>{
 
  
     this.toastCtrl.create({
            message: data.message,
            duration: 3000,
            position: 'bottom',
            showCloseButton : true,
            
          }).present();
   if(data.status==1){
     this.getComments(this.postdata.id);
     this.textcomment = "";
   }

  },error=>{
  
     console.log(error);
  },()=>{


  });
  
   }


 deletePost(){

  this.rest.deleteBlogPost({'post_id':this.postdata.id,'type':'soft'}).subscribe(data=>{
    this.toastCtrl.create({
            message: 'Post Deleted Successfully',
            duration: 3000,
            position: 'bottom',
            showCloseButton : true,
            
          }).present();

    this.navCtrl.setRoot(HomePage);
  //console.log('delete');
 },error=>{


 },()=>{

 });

 }

 editPost(){
  this.editposttext = true;
   this.edit_description = this.postdata.description;
   }


 updatePost(){
 
  this.rest.updateBlogPost({'post_id':this.postdata.id,'description': this.edit_description,'user_id':this.userid}).subscribe(data=>{
    this.toastCtrl.create({
            message: data.message,
            duration: 3000,
            position: 'bottom',
            showCloseButton : true,
            
          }).present();

    this.navCtrl.setRoot(HomePage);

 },error=>{


 },()=>{

 });

 

 } 
}
