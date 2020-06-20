import { Component } from '@angular/core';
import { ParkingService } from '../services/parking.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalFilterPage } from '../modal-filter/modal-filter.page';

declare let google: any;

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  // show filter by types
  public showTypes = true;
  // Map
  public map: any;
  // show full map
  public mapCenter: any;
  // map center
  public showFullMap = true;
  // filter by: 0 - restaurant, 1 - hotel, 2 - attraction
  public searchBy = 1;
  // list of items
  public items: any;
  // markers
  public markers: Array<any> = [];

  constructor(
    public router: Router,
    public parkingService: ParkingService,

    public modalCtrl: ModalController
  ) {}

  ionViewDidEnter() {
    // init map
    this.initializeMap();
  }

  initializeMap() {
    const latLng = new google.maps.LatLng(21.0318202, 105.8495298);

    const mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false,
    };

    this.map = new google.maps.Map(
      document.getElementById('map-search'),
      mapOptions
    );
    const options = { timeout: 120000, enableHighAccuracy: true };

    // refresh map
    this.resizeMap();

    // use GPS to get center position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.mapCenter = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        this.map.setCenter(this.mapCenter);
        new google.maps.Marker({
          map: this.map,
          position: this.map.getCenter(),
          icon: 'http://www.robotwoods.com/dev/misc/bluecircle.png',
        });
      },
      (error) => {
        console.log(error);
      },
      options
    );
  }

  // resize map
  resizeMap() {
    // refresh map
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
      this.map.setCenter(this.mapCenter);
    }, 300);
  }

  // show search form
  showForm() {
    this.showTypes = true;
    this.showFullMap = true;
    this.resizeMap();
  }

  // implement search
  search(searchBy) {
    this.showTypes = false;
    this.showFullMap = false;

    this.items = this.parkingService.getAll();

    this.clearMarkers();
    this.setMarkers();
    this.resizeMap();
  }

  // make array with range is n
  range(n) {
    return new Array(Math.round(n));
  }

  // set map markers
  setMarkers() {
    for (const item of this.items) {
      const location = item.location;
      const marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(location.lat, location.lon),
      });
      this.markers.push(marker);
    }
  }

  // clear markers
  clearMarkers() {
    for (const marker of this.markers) {
      marker.setMap(null);
    }

    this.markers = [];
  }

  // show filter modal
  async showFilter() {
    const modal = await this.modalCtrl.create({
      component: ModalFilterPage,
    });
    return modal.present();
  }

  // view item detail
  nagivate(id) {
    // search by restaurant
    this.router.navigateByUrl('/navigate/' + id);
  }
}
