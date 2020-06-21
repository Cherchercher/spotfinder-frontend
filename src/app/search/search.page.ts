import { Component } from '@angular/core';
import { ParkingService } from '../services/parking.service';
import '../../../node_modules/leaflet/dist/leaflet.css';
import * as Leaflet from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = Leaflet.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

@Component({
  selector: 'page-search',
  templateUrl: 'search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  map: Leaflet.Map;
  parkingSpots = [];
  public showTypes = true;
  isMap = true;
  constructor(public parkingService: ParkingService) {
    this.parkingSpots = parkingService.getAll();
  }

  ionViewDidEnter() {
    this.map = new Leaflet.Map('mapParking').setView([33.8003, -117.8827], 16);

    Leaflet.tileLayer(
      'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      {
        attribution: 'goplanatrip.com',
      }
    ).addTo(this.map);

    this.setMarkers();
  }

  setMarkers() {
    Leaflet.Marker.prototype.options.icon = iconDefault;
    for (const parkingSpot of this.parkingSpots) {
      Leaflet.marker([parkingSpot.lat, parkingSpot.lng])
        .addTo(this.map)
        .bindPopup(parkingSpot.name)
        .openPopup();
    }
  }

  showForm() {
    this.showTypes = true;
  }

  clearMarkers() {
    if (this.isMap === true) {
      {
        // For each layer on the map remove everything and clear variables
        this.map.eachLayer(function(layer) {
          this.map.remove();
          this.map.removeLayer(layer);
          Leaflet.PointManager.deletePoints(); // clear the pointManager array of points
          this.isMap = false;
        });
        this.parkingSpots = [];
      }
    }
  }

  ionViewWillLeave() {
    this.map.remove();
  }
}
