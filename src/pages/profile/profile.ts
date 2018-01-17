import { Component } from '@angular/core';
import { NavController, NavParams,ActionSheetController, AlertController,LoadingController,ToastController} from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { END_POINTS } from '../../config'; 

import { PortfolioPage } from '../portfolio/portfolio';
import { TimelinePage } from '../timeline/timeline';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
   user:any;
   user_id:number;
   username : string;
   designation :string;
   email : string;
   mobile : string;
   company : string;
   course : string;
   yrsofpass : string;
   profile_pic:string = END_POINTS.imageUrl; //"assets/img/default_user.png";
   cover_pic:string = END_POINTS.imageUrl; //"assets/img/default_user.png";
  
  options: CameraOptions = {
  quality: 100,
  allowEdit:true,
  destinationType: this.camera.DestinationType.FILE_URI,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE,
  };

  results :  string[];
  loader:any; 


  constructor(private camera: Camera,public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,private transfer: FileTransfer,public alertCtrl: AlertController,private rest : RestProvider,public loadingCtrl: LoadingController,private toastCtrl: ToastController,private storage: Storage) {

  }

  ionViewDidLoad() {
   // console.log(this.navParams.get('user'))
     this.user = this.navParams.get('user');
     console.log(this.user.first_name);
     this.profile_pic = (this.user.profileimage=="") ? 'assets/img/default_user.png' : this.profile_pic+"/"+this.user.profileimage;
     this.username = this.user.first_name+" "+this.user.last_name;
     this.user_id = this.user.id;
     this.designation = this.user.designation;
     this.email = this.user.email;
     this.mobile = this.user.mobile;
     this.company = this.user.company;
     this.course = this.user.course;
     this.yrsofpass = this.user.yrsofpass;
     this.cover_pic = (this.user.coverimage==""|| this.user.coverimage==undefined ) ? 'assets/img/default_cover.jpg' : this.cover_pic+"/"+this.user.coverimage;

   // console.log('ionViewDidLoad ProfilePage');
  }



   presentActionSheet(pictype) {

    
    let actionSheet = this.actionSheetCtrl.create({
      title: pictype+' photo',
      buttons: [
        {
          text: 'Camera',
          icon: 'md-camera', 
          handler: () => {
            this.options.sourceType = 1;
            this.getPicture(pictype);
          }
        },{
          text: 'Gallary',
          icon: 'md-image',
          handler: () => {
           this.options.sourceType = 2;
           this.getPicture(pictype);
           // console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
 
  getPicture(pictype){
      this.camera.getPicture(this.options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64:
       let base64Image = imageData;
           if(pictype=='profile'){

             this.profile_pic = base64Image;

           }else{

           this.cover_pic == base64Image;
           
           }

           this.upload( base64Image, pictype)
           

            


      }, (err) => {
       // Handle error
      });
   

  }
 

 fileTransfer: FileTransferObject = this.transfer.create();

  upload(image:any,pictype) {
    let url : string = "http://www.manthanartschool.com/app-rest-apis/mschoolbackend/app/Http/Controllers/upload.php";//END_POINTS.uploadUrl ;
     let newFilename = "";
    alert('uploading');
   
    if(pictype=='Cover'){

      newFilename   = "coverpic_";

    }else{
   
      newFilename = "profile_";
   
    }

    newFilename = newFilename + this.user.first_name+"_"+this.user.last_name+"_"+this.user.id+"_"+Math.floor((Math.random() * 100000) + 1)+".jpg";
  let options: FileUploadOptions = {
     fileKey: 'file',
     fileName: 'name.jpg',
     headers: {},
     params : {'directory':'upload', 'fileName':newFilename,'type': pictype}
    }

  try{
 


         
       this.fileTransfer.upload(image, url , options)
       .then((data) => {
        console.log(data);
         if(pictype=='profile'){
             let filename = {profileimage:newFilename};
           this.updateProfile(filename,this.user.id,'profileimage');
         }else{
            let filename = {coverimage:newFilename};
           this.updateProfile(filename,this.user.id,'coverimage');
         }
         

         /*this.toastCtrl.create({
              message: "Profile Image uploaded Successfully",
              duration: 5000,
              position: 'bottom'
            }).present();*/


         
       }, (err) => {
         // error
         alert('error');
       })
       }catch(e){
         
         console.log(e);

       }
 
}


  showPrompt(fieldTitle,fieldname,type) {
    let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: "Enter Your "+fieldTitle,
      inputs: [
        {
          type: type,
          name: fieldname,
          placeholder: fieldTitle,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log(data);
          }
        },
        {
          text: 'Save',
          handler: data => {
          
            this.updateProfile(data,this.user.id,fieldname);
          }
        }
      ]
    });
    prompt.present();
  } 


  updateProfile(data,user_id,fieldname){
   data.user_id = user_id;
   data.field = fieldname;
   this.rest.updateProfile(data).subscribe(data=>{

    if(data.status=="success"){

     if(fieldname == 'designation'){
     this.designation = data.designation;
    }
      if(fieldname == 'email'){
     this.email = data.email;
    }
      if(fieldname == 'company'){
     this.company = data.company;
    }
      if(fieldname == 'mobile'){
     this.mobile = data.mobile;
    }
    
     this.storage.remove('student');
     this.storage.set('student', JSON.stringify(data.student));

  
   }
   
    this.toastCtrl.create({
              message: data.message,
              duration: 5000,
              position: 'bottom'
            }).present();


   },error=>{



   },()=>{



   });
   
    }
   

  
  
  viewTimeline(id:number){

   console.log(id);

  this.navCtrl.push(TimelinePage,{'user_id':id,'username':this.username});

  }


  viewPortfolio(id){
     console.log(id);
   this.navCtrl.push(PortfolioPage,{'user_id':id,'username':this.username});
  }
  
  
}
