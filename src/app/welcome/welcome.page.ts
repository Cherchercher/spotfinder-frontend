import {Component} from '@angular/core';
import {MenuController} from '@ionic/angular';


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {

  constructor(public menuCtrl: MenuController) {
    this.menuCtrl.enable(false);
  }

}
