import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams ,Searchbar } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { JobdetailsPage } from '../jobdetails/jobdetails';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
   @ViewChild('searchbar') searchbar:Searchbar;

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
  constructor(public navCtrl: NavController, public navParams: NavParams,private rest : RestProvider) {

  
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];
     
    this.items = [];
   
  }

   ionViewDidLoad() {
  
   this.getJobs(this.pagination);

  }



  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
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
  
     this.rest.getJobs(pagination).subscribe(data => {
        console.log(data);
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
                alert('error');
             
        },
        () =>{}
        )
     

  }

  doInfinite(infiniteScroll){
     //console.log(this.pagination);
     
     this.infiniteScroll = infiniteScroll;
     this.rest.getJobs(this.pagination).subscribe(data => {
        console.log(data);
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
                alert('error');
             
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



}
