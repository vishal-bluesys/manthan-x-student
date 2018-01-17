import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,LoadingController,ToastController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-portfolio',
  templateUrl: 'portfolio.html',
})
export class PortfolioPage {
  user_id : number;
  username : string;
  items : string;
  owned : boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams ,public alertCtrl: AlertController,private rest : RestProvider,public loadingCtrl: LoadingController,private toastCtrl: ToastController,public storage : Storage) {
   this.user_id = this.navParams.get('user_id');
   this.username = this.navParams.get('username');
    this.storage.get('student').then((user) => {
     let user_data = JSON.parse(user);
    // this.userid = user_data.id;
    // this.user_name = user_data.first_name+" "+ user_data.last_name; 
     this.owned = (this.user_id == user_data.id ) ? true : false;
     });
    this.items="";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PortfolioPage');
   
   this.getPortfolio();


  }


  getPortfolio(){

 this.rest.getPortfolio(this.user_id).subscribe(data=>{
    	console.log(data);
        this.items = data;

    },
    error=>{


    },()=>{

    });


  }


  openUrl(url){
   
     
    window.open(url,"_blank");

  }

  addPortfolio(item,user_id){

  // console.log(item);

   let data = {'portfolio_link':item.link , "user_id":user_id};

   this.rest.addPortfolio(data).subscribe(data=>{
    
     this.getPortfolio();
      this.toastCtrl.create({
              message: "link added Successfully",
              duration: 5000,
              position: 'bottom'
            }).present();

   },error=>{

   	this.toastCtrl.create({
              message: "Something went Wrong",
              duration: 5000,
              position: 'bottom'
            }).present();
   },()=>{


   })

  }


   showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Add',
      message: "Enter Your Portfolio link",
      inputs: [
        {
          type: "text",
          name: "link",
          placeholder: "Enter link here",
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
          
           this.addPortfolio(data,this.user_id);
          }
        }
      ]
    });
    prompt.present();
  } 
  

  updatePortfolio(item,id){
   
    let data = {
    	"portfolio_link":item.link,
    	 "id":id
     }
    this.rest.updatePortfolio(data).subscribe(data=>{
         this.toastCtrl.create({
              message: "link updated Successfully",
              duration: 5000,
              position: 'bottom'
            }).present();

    this.getPortfolio();
    },error=>{
      this.toastCtrl.create({
              message: "Something went wrong",
              duration: 5000,
              position: 'bottom'
            }).present();

    },()=>{


    })


  }
  
   EditItem(item) {
    let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: "Enter Your Portfolio link",
      inputs: [
        {
          type: "text",
          name: "link",
          placeholder: "Enter link here",
          value:item.portfolio_link,
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
          
           this.updatePortfolio(data,item.id);
          }
        }
      ]
    });
    prompt.present();
  }

 
showConfirm(item) {
    let confirm = this.alertCtrl.create({
      title: 'Delete link',
      message: 'Do you want to delete ${item.portfolio_link} this link',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            //console.log('Agree clicked');

            this.deleteItem(item.id);
          }
        }
      ]
    });
    confirm.present();
  }

deleteItem(id){

this.rest.deletePortfolio(id).subscribe(data=>{
         this.toastCtrl.create({
              message: "link deleted Successfully",
              duration: 5000,
              position: 'bottom'
            }).present();

    this.getPortfolio();
    },error=>{
      this.toastCtrl.create({
              message: "something went wrong",
              duration: 5000,
              position: 'bottom'
            }).present();

    },()=>{


    })

}

}
