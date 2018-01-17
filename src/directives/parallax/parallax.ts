import { Directive,ElementRef,Renderer } from '@angular/core';

/**
 * Generated class for the ParallaxDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[parallax]' ,
  host:{
  
     '(ionScroll)' : 'onContentScroll($event)'


  }
})
export class ParallaxDirective {

  constructor (public el:ElementRef,public re:Renderer) {
    console.log('Hello ParallaxDirective Directive');
  }

  header : any;
  main_cnt :  any;
  ta:any;
  sa:any;

  ngOnInit(){
  
   let cnt = this.el.nativeElement.getElementsByClassName('scroll-content')[0];
   this.header= cnt.getElementsByClassName('bg')[0];
   this.main_cnt = cnt.getElementsByClassName('main-cnt')[0];

   this.re.setElementStyle(this.header,'webTramsformOrigin','center bottom');
   this.re.setElementStyle(this.header,'background-size','cover');
   this.re.setElementStyle(this.main_cnt,'position','absolute');




  }


  onContentScroll(ev){

    ev.domWrite(()=>{

    	this.update(ev);
    })

  }
 

 update(ev){
   
    if(ev.scrollTop>0){
         
      this.ta = ev.scrollTop/2;

    }
  
    this.re.setElementStyle(this.header,'webkitTransform','translate3d(0,'+ this.ta +'px,0) scale(1,1)')

 }
  
}
