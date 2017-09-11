import { Component } from '@angular/core';
import { NavController, NavParams , LoadingController,ToastController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Device } from '@ionic-native/device';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { RestProvider } from '../../providers/rest/rest';
import { HomePage } from '../home/home';

/**
 * Generated class for the NewpostPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-newpost',
  templateUrl: 'newpost.html',
})
export class NewpostPage {

  imagesrc:any;
  loader:any;
  description:any;
  user_name : string;
  userid : string; 
  filename : string;
  options: CameraOptions = {
  quality: 50,
  allowEdit:true,
  destinationType: this.camera.DestinationType.FILE_URI,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE,
  saveToPhotoAlbum:true,
  };



  constructor(public navCtrl: NavController, public navParams: NavParams,private camera: Camera,public actionSheetCtrl: ActionSheetController,private transfer: FileTransfer,  private rest : RestProvider,public loadingCtrl: LoadingController,private toastCtrl: ToastController,private device: Device,public storage : Storage) {
 this.storage.get('student').then((user) => {
     let user_data = JSON.parse(user);
     this.userid = user_data.id;
     this.user_name = user_data.first_name+" "+ user_data.last_name; 
     this.filename = user_data.first_name+"_"+ user_data.last_name; 
     
     });

  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewpostPage');
  }


  presentLoading() {
    this.loader = this.loadingCtrl.create({
      spinner:'dots',
      });
    this.loader.present();
    }



  presentActionSheet() {

    
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Profile photo',
      buttons: [
        {
          text: 'Camera',
          icon: 'md-camera', 
          handler: () => {
            this.imagesrc = null;
            this.options.sourceType = 1;
            this.getPicture();
          }
        },{
          text: 'Gallary',
          icon: 'md-image',
          handler: () => {
          this.imagesrc = null;
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
			
		       this.imagesrc = imageData;
			}, (err) => {
			 // Handle error
			});
   

  }
 

 fileTransfer: FileTransferObject = this.transfer.create();

  upload(filename:any,post_id:number) {
    let url : string = "http://bluesys.in/dev/mschoolbackend/app/Http/Controllers/upload.php" ;

  let options: FileUploadOptions = {
     fileKey: 'file',
     fileName: 'name.jpg',
     headers: {},
     params : {'directory':'post', 'fileName': filename,'type': 'post'}
    }

  try{
       this.fileTransfer.upload(this.imagesrc, url , options)
       .then((data) => {
         
            this.loader.dismiss(); 
            this.navCtrl.setRoot(HomePage);
            this.toastCtrl.create({
            message:'Posted successfully',
            duration: 3000,
            position: 'bottom',
            showCloseButton : true,
            
          }).present();

       }, (err) => {
           this.loader.dismiss(); 
          this.rest.deleteBlogPost({'post_id':post_id,'type':'permenent'}).subscribe(data=>{console.log('delete')},
         error=>{},
         ()=>{});
       })
       }catch(e){
          this.loader.dismiss(); 
          this.rest.deleteBlogPost({'post_id':post_id,'type':'permenent'}).subscribe(data=>{console.log('delete')},
         error=>{},
         ()=>{});
       }
 
}

  
  submitPost(){
   this.presentLoading();
   if(this.imagesrc){
     this.filename = this.filename+"_"+Math.floor((Math.random() * 10000) + 1)+"_"+this.device.serial+"_post.jpg";
     }else{

     this.filename = "";
     }
    

   let data = {'description':this.description,'images':this.filename , 'userid':this.userid , 'user_name':this.user_name,'device_id':this.device.serial};

  // console.log(data);
    this.rest.addBlogPost(data).subscribe(data => {
      console.log(data);

    if(data.status=='1'){
          
          if(this.imagesrc){
             this.upload(this.filename,data.id);
          }else{

             this.loader.dismiss(); 
          this.navCtrl.setRoot(HomePage);
           this.toastCtrl.create({
            message:'Posted successfully',
            duration: 3000,
            position: 'bottom',
            showCloseButton : true,
            
          }).present();
          };
     }else{
           
           this.loader.dismiss(); 
           this.toastCtrl.create({
            message: data.message,
            duration: 3000,
            position: 'bottom',
            showCloseButton : true,
            
          }).present();

     }
      

    },error=>{ 
          this.loader.dismiss(); 
      console.log(error) 
    },
    ()=>{

       console.log("request served")

    });
  }

}
