import { Component } from '@angular/core';
import { NavController, NavParams,ActionSheetController, AlertController,LoadingController,ToastController} from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
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
   username : string;
   designation :string;
   email : string;
   mobile : string;
   company : string;
   course : string;
   profile_pic:string = "http://bluesys.in/dev/mschoolbackend/public/images"; //"assets/img/default_user.png";

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
     this.designation = this.user.designation;
     this.email = this.user.email;
     this.mobile = this.user.mobile;
     this.company = this.user.company;
     this.course = this.user.course;

    console.log('ionViewDidLoad ProfilePage');
  }



   presentActionSheet() {

    
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Profile photo',
      buttons: [
        {
          text: 'Camera',
          icon: 'md-camera', 
          handler: () => {
            this.options.sourceType = 1;
            this.getPicture();
          }
        },{
          text: 'Gallary',
          icon: 'md-image',
          handler: () => {
           this.options.sourceType = 2;
           this.getPicture();
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
 
  getPicture(){
      this.camera.getPicture(this.options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64:
       let base64Image = imageData;
           this.profile_pic = base64Image;

            this.upload(this.profile_pic)
      }, (err) => {
       // Handle error
      });
   

  }
 

 fileTransfer: FileTransferObject = this.transfer.create();

  upload(image:any) {
    let url : string = "http://bluesys.in/dev/mschoolbackend/app/Http/Controllers/upload.php" ;
    let newFilename =  this.user.first_name+"_"+this.user.last_name+"_"+this.user.id+"_"+Math.floor((Math.random() * 100000) + 1)+".jpg";
  let options: FileUploadOptions = {
     fileKey: 'file',
     fileName: 'name.jpg',
     headers: {},
     params : {'directory':'upload', 'fileName':newFilename,'type': 'profile'}
    }

  try{
       this.fileTransfer.upload(image, url , options)
       .then((data) => {
         let filename = {profileimage:newFilename};
         this.updateProfile(filename,this.user.id,'profileimage');

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
   

  



}
