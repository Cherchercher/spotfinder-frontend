import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'app-modal-filter',
  templateUrl: './modal-filter.page.html',
  styleUrls: ['./modal-filter.page.scss'],
})
export class ModalFilterPage {
  // tribes
  public tribes = [
    {id: 1, name: 'Adventure'},
    {id: 2, name: 'Artsy'},
    {id: 3, name: 'Backpacker'},
    {id: 4, name: 'Budget'},
    {id: 5, name: 'Business'},
    {id: 6, name: 'Families'},
    {id: 7, name: 'Foodies'},
    {id: 8, name: 'Green'},
    {id: 9, name: 'History'},
    {id: 10, name: 'LGBT'},
    {id: 11, name: 'Local'},
    {id: 12, name: 'Luxury'},
    {id: 13, name: 'Nightlife'},
    {id: 14, name: 'Outdoorsy'},
    {id: 15, name: 'Spiritual'}
  ];

  constructor(public router: Router, public modalCtrl: ModalController) {
  }

  // dismiss modal
  dismiss() {
    this.modalCtrl.dismiss();
  }
}
