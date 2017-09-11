import { Component } from '@angular/core';
import { NavController, NavParams , LoadingController,ToastController} from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


import { RestProvider } from '../../providers/rest/rest';

import { LoginPage } from '../login/login';

/**
 * Generated class for the Registration2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-registration2',
  templateUrl: 'registration2.html',
})
export class Registration2Page {
  
  imagefile : string ="assets/img/default_user.png";
  cameraBtn : any = "cameraBtn";
 // form1Data : any ; 
  options: CameraOptions = {
  quality: 100,
  allowEdit:true,
  destinationType: this.camera.DestinationType.FILE_URI,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE,
  };

  registartionForm : FormGroup;
  results :  string[];
  loader:any;

  constructor(private camera: Camera, public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController, fb: FormBuilder,private transfer: FileTransfer,  private rest : RestProvider,public loadingCtrl: LoadingController,private toastCtrl: ToastController) {
   this.registartionForm = fb.group({
          'email' : [null,  Validators.compose([Validators.required,
                                                Validators.email])],
          'password' : [null, Validators.required],
          })
 

  }

 
  ionViewDidLoad() {
    console.log('ionViewDidLoad Registration2Page');
 
    
   
  }
 
 /* for loading  */
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
		       this.imagefile = base64Image;
			}, (err) => {
			 // Handle error
			});
   

  }
 

 fileTransfer: FileTransferObject = this.transfer.create();

  upload(filename:any) {
    let url : string = "http://bluesys.in/dev/mschoolbackend/app/Http/Controllers/upload.php" ;

  let options: FileUploadOptions = {
     fileKey: 'file',
     fileName: 'name.jpg',
     headers: {},
     params : {'directory':'upload', 'fileName': filename+'.jpg','type': 'profile'}
    }

  try{
       this.fileTransfer.upload(this.imagefile, url , options)
       .then((data) => {
         // success
         //alert('success fully uploaded'+data);
       }, (err) => {
         // error
         alert('error');
       })
       }catch(e){
         
         console.log(e);

       }
 
}


  register(value:any){
     
   value.firstname = this.navParams.get('firstname');
   value.lastname = this.navParams.get('lastname');
   value.course = this.navParams.get('course');
   value.yrsofpass = this.navParams.get('yrsofpass');
   value.mobile = this.navParams.get('mobile');
   value.companyname = this.navParams.get('companyname');
   value.designation = this.navParams.get('designation');
   this.presentLoading();

   this.rest.register(value).subscribe(data => {
      // Read the result field from the JSON response.
      if(data.status=='success'){
        let filename = value.firstname+"_"+data.id+"_"+value.lastname;
        this.upload(filename);      

            this.toastCtrl.create({
              message: 'Registration successfully Login after varification and Activation',
              duration: 10000,
              position: 'bottom'
            }).present();

             this.navCtrl.setRoot(LoginPage);
        }
        else{
            
            alert('user already exists for This email id');
        }
     
    },
    error => {
           alert('error');
           this.loader.dismiss(); 
    },
    ()=>  this.loader.dismiss() 
    );
     
    
  
         

  }



}
