import { Component } from '@angular/core';

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'app-neighborhood',
  templateUrl: './neighborhood.page.html',
  styleUrls: ['./neighborhood.page.scss'],
})
export class NeighborhoodPage {
  // restaurants
  public restaurants: any;
  // hotels
  public hotels: any;
  // attractions
  public attractions: any;

  constructor() {}

  // make array with range is n
  range(n) {
    return new Array(Math.round(n));
  }
}
