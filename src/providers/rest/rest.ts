import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { END_POINTS } from '../../config'; 

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RestProvider {

  //base_url :string = "http://bluesys.in/dev/mschoolbackend/public/";
 // base_url :string = "http://localhost/mschoolbackend/public/";
    base_url : string = END_POINTS.baseUrl;
  constructor(public http: Http) {
    
    
  }


  register(data) {
    var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','text/json');

         return this.http.post(this.base_url+'xstudent/register',data,{headers})
    						.map(res=>res.json())
    						.catch(this.handleError);


  }
 
   login(data) {
    var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','text/json');

         return this.http.post(this.base_url+'xstudent/login',data,{headers})
    						.map(res=>res.json())
    						.catch(this.handleError);


  }


  getCourses(){
  
    var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','text/json');
         headers.append("Access-Control-Allow-Origin", "*"); 
         headers.append("Access-Control-Allow-Methods","POST,GET, DELETE");
         headers.append("Access-Control-Allow-Headers", "Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Client-Offset");

         return this.http.get('assets/coursearray.json', {headers})
                .map(res=>res.json())
                .catch(this.handleError);
    


  }

   getAllusers(id){
  
    var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');
        
         return this.http.get(this.base_url+'xstudent/alluser/'+id, {headers})
                .map(res=>res.json())
                .catch(this.handleError);
    


  }



   postJob(data,userid) {
    var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','text/json');

         return this.http.post(this.base_url+'postjob/'+userid, data, {headers})
                .map(res=>res.json())
                .catch(this.handleError);


   }


 getJobs(pagination){
  
    var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');
        
         return this.http.get(this.base_url+'getjob' , {headers, params:pagination })
                .map(res=>res.json())
                .catch(this.handleError);
    


  }
 
getMyJobs(pagination,userid){
    console.log("rest pass user"+userid)
    var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');
        
         return this.http.get(this.base_url+'getmyjob/'+userid,{headers,params:pagination })
                .map(res=>res.json())
                .catch(this.handleError);
    


  }

  getNotificationCount(user_id){

    var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');
        
        return this.http.get(this.base_url+ "blog/notification/count/"+user_id , {headers})
                .map(res=>res.json())
                .catch(this.handleError);


  }

  getNotifications(user_id){

        var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');
        
        return this.http.get(this.base_url+ "blog/notification/"+user_id , {headers})
                .map(res=>res.json())
                .catch(this.handleError);



  }

 getBlogPost(pagination){


       var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');
        
        return this.http.get(this.base_url+ "blog/index" , {headers, params:pagination })
                .map(res=>res.json())
                .catch(this.handleError);

 }


  getTimelinePost(pagination,user_id){


       var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');
        
        return this.http.get(this.base_url+ "blog/timeline" , {headers, params:{pagination:pagination,user_id:user_id}})
                .map(res=>res.json())
                .catch(this.handleError);

 }

 getBlogPostComments(postid){

    
       var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');
        
        return this.http.get(this.base_url+ "blog/post/comment" ,{headers, params:{post_id: postid} })
                .map(res=>res.json())
                .catch(this.handleError);

 }

  addBlogPost(data){

       var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');
        
         return this.http.post(this.base_url+ "blog/addPost" ,data,{headers})
                .map(res=>res.json())
                .catch(this.handleError);

 }

   updateBlogPost(data){

       var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');
        
         return this.http.post(this.base_url+ "blog/updatePost",data,{headers})
                .map(res=>res.json())
                .catch(this.handleError);

   }
 

  addComment(data){

       var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');
        
         return this.http.post(this.base_url+ "blog/addComment",data,{headers})
                .map(res=>res.json())
                .catch(this.handleError);

 }
 

 deleteBlogPost(blogpost){

     var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');

     return this.http.get(this.base_url+ "blog/deletePost" , {headers, params:blogpost})

                .map(res=>res.json())
                .catch(this.handleError);

 }
 

 deleteJobPost(id){

     var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');

     return this.http.get(this.base_url+ "deletejob/"+id , {headers})

                .map(res=>res.json())
                .catch(this.handleError);

 }

 updateProfile(data){
   
         var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');

         return this.http.post(this.base_url+"xstudent/update/profile",data,{headers})
                .map(res=>res.json())
                .catch(this.handleError);


 }


   getPortfolio(id){

        var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');

         return this.http.get(this.base_url+"xstudent/getportfolio/"+id,{headers})
                .map(res=>res.json())
                .catch(this.handleError);


 }

 addPortfolio(data){

        var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');

         return this.http.post(this.base_url+"xstudent/addportfolio",data,{headers})
                .map(res=>res.json())
                .catch(this.handleError);


 
}

 updatePortfolio(data){

        var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');

         return this.http.post(this.base_url+"xstudent/updateportfolio",data,{headers})
                .map(res=>res.json())
                .catch(this.handleError);


 }

  deletePortfolio(id){

        var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');

         return this.http.get(this.base_url+"xstudent/deleteportfolio/"+id,{headers})
                .map(res=>res.json())
                .catch(this.handleError);


 }

  updatePassword(data){
   
         var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');

         return this.http.post(this.base_url+"xstudent/update/password",data,{headers})
                .map(res=>res.json())
                .catch(this.handleError);


 }


  resetPassword(data){

     var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');

     return this.http.get(this.base_url+ "xstudent/reset/password" , {headers, params:{'email':data}})

                .map(res=>res.json())
                .catch(this.handleError);

 }


  clearNotification(data){

     var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');

     return this.http.get(this.base_url+ "blog/notification/clear/"+data, {headers})

                .map(res=>res.json())
                .catch(this.handleError);

 }

   readNotification(data){

     var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');

     return this.http.get(this.base_url+ "blog/notification/read/"+data, {headers})

                .map(res=>res.json())
                .catch(this.handleError);

 }

    getPost(data){

     var headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded');
         headers.append('Content-Type','application/json');

     return this.http.get(this.base_url+ "blog/getpost/"+data, {headers})

                .map(res=>res.json())
                .catch(this.handleError);

 }

 private handleError (error: Response | any) {
	  let errMsg: string;
	  if (error instanceof Response) {
	    let body = error.json() || '';
	    let err = body.error || JSON.stringify(body);
	    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
	  } else {
	    errMsg = error.message ? error.message : error.toString();
	  }
	  //console.error(errMsg);
	  return Observable.throw(errMsg);
  }

}
