import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController,LoadingController , ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { JobdetailsPage } from '../jobdetails/jobdetails';
import { PostjobPage } from '../postjob/postjob';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the PostedjobsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-postedjobs',
  templateUrl: 'postedjobs.html',
})
export class PostedjobsPage {

  userid : any ;
    loader:any;
  jobList:any;
  total:number;
  page:number= 0;
  pagination : any = {"page":this.page,"perpage":5 , "searchText":""};
  selectedItem: any;
  showSearchTool :any =false;
  hideNavbar : any = true;
  icons: string[];
  infiniteScroll:any;
  items: Array<{id:string, jobtitle:string, designation:string, company:string, city:string, email:string, website:string, phone:string,experince:string, skills:string, jobd:string }>;
  shouldShowCancel : string = 'true';
  constructor(public navCtrl: NavController, public navParams: NavParams,private rest : RestProvider,private storage: Storage,public alertCtrl: AlertController, public loadingCtrl : LoadingController,private toastCtrl: ToastController) {

    this.storage.get('student').then((user) => {
     let user_data = JSON.parse(user);
     this.userid = user_data.id;
   
     this.getJobs(this.pagination);
     });

   
    this.items = [];
   
  }

 
 /* for loading  */
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      spinner:'dots',
      });
    this.loader.present();
    }

 showSearch(){

   this.showSearchTool = true;
   this.hideNavbar = false;
  
  }

  onCancel(event:any){
 this.showSearchTool = false;
   this.hideNavbar = true;

  }

  getJobs(pagination:any){
     
     this.rest.getMyJobs(pagination,this.userid).subscribe(data => {
         let lenght = data.jobs.length;
         for (let i = 0; i < lenght; i++) {
            this.items.push({
              id:data.jobs[i]['id'],
              jobtitle:data.jobs[i]['jobtitle'],
              designation:data.jobs[i]['designation'],
              company:data.jobs[i]['company'], 
              city:data.jobs[i]['city'], 
              email:data.jobs[i]['email'], 
              website:data.jobs[i]['website'], 
              phone:data.jobs[i]['phone'], 
              experince:data.jobs[i]['experince'], 
              skills:data.jobs[i]['skills'], 
              jobd:data.jobs[i]['jobd']
            });
        
        }

     
        this.page = 1;
        this.pagination.page = this.page;
        console.log(this.page);
        this.total=data.total;
         },
        error => {
              this.toastCtrl.create({
              message: 'Network Error',
              duration: 5000,
              position: 'top'
            }).present();

           
             
        },
        () =>{}
        )
     

  }

  doInfinite(infiniteScroll){
    
     this.infiniteScroll = infiniteScroll;
     this.rest.getMyJobs(this.pagination,this.userid).subscribe(data => {
       // console.log(data);
          let lenght = data.jobs.length;
             for (let i = 0; i < lenght; i++) {
            this.items.push({
              id:data.jobs[i]['id'],
              jobtitle:data.jobs[i]['jobtitle'],
              designation:data.jobs[i]['designation'],
              company:data.jobs[i]['company'], 
              city:data.jobs[i]['city'], 
              email:data.jobs[i]['email'], 
              website:data.jobs[i]['website'], 
              phone:data.jobs[i]['phone'], 
              experince:data.jobs[i]['experince'], 
              skills:data.jobs[i]['skills'], 
              jobd:data.jobs[i]['jobd']
            });
        
        }
           
        this.page = Number(data.page)+1;
        this.pagination.page = this.page;
        console.log(this.page);
        this.total=data.total;
        let item_length = this.items.length;
        if(item_length ==  this.total){
          infiniteScroll.enable(false);

        }else{
        infiniteScroll.enable(true);
        }


         },
        error => {
               alert('Something went wrong');
             
        },
        () =>{  infiniteScroll.complete();}
        )
     

  }

  doRefresh(refresher){
    this.items = [];
    this.pagination.page = 0;
    this.pagination.searchText="";
      this.infiniteScroll.enable(true);
   this.getJobs(this.pagination);
   refresher.complete();
  
  }


  showDetails(event,jobDetails){
               this.onCancel(event);
                 
               this.navCtrl.push(JobdetailsPage,jobDetails);
  
 }


 onInput(ionInput){
  this.items = [];
  this.pagination.page = 0;
  this.pagination.searchText=ionInput.target.value;
  
  this.getJobs(this.pagination);

 }


 postJob(){
 
   console.log(this.userid);
   this.navCtrl.push(PostjobPage,{'userid': this.userid});
  

 }

  showConfirm(id,index) {
    let confirm = this.alertCtrl.create({
      title: 'Delete Job ',
      message: 'Do you want to Delete Job ',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
           // console.log('Disagree clicked');
          }
        },
        {
          text: 'Proceed',
          handler: () => {
            this.deleteJob(id,index)
          }
        }
      ]
    });
    confirm.present();
  }


 deleteJob(id,index){
  this.presentLoading();
//  console.log(id+""+index);

  this.rest.deleteJobPost(id).subscribe(data=>{
  
    this.toastCtrl.create({
              message: 'Deleted Successfully',
              duration: 5000,
              position: 'bottom'
            }).present();

   this.items.splice(index,1);

  },error=>{
this.loader.dismiss(); 

    this.toastCtrl.create({
              message: 'Network Error',
              duration: 5000,
              position: 'botton'
            }).present();
  },()=>{

this.loader.dismiss(); 
  });

 }

}
