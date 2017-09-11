import { Component } from '@angular/core';

/**
 * Generated class for the WelcomeComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'welcome',
  templateUrl: 'welcome.html'
})
export class WelcomeComponent {

  text: string;

  constructor() {
    console.log('Hello WelcomeComponent Component');
    this.text = 'Hello World';
  }

}
