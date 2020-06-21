import { Component } from "@angular/core";

import { ParkingService } from "../services/parking.service";

import "../../../node_modules/leaflet/dist/leaflet.css";
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import * as Leaflet from "leaflet";
const iconRetinaUrl = "assets/marker-icon-2x.png";
const iconUrl = "assets/marker-icon.png";
const shadowUrl = "assets/marker-shadow.png";

const car1 = "assets/img/parking/car1.png";

const yx = Leaflet.latLng;
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

const xy = (x, y) => {
  if (Leaflet.Util.isArray(x)) {
    // When doing xy([x, y]);
    return yx(x[1], x[0]);
  }
  return yx(y, x); // When doing xy(x, y);
};

@Component({
  selector: "page-navigate",
  templateUrl: "navigate.page.html",
  styleUrls: ["./navigate.page.scss"],
})
export class NavigatePage {
  map: Leaflet.Map;
  public showTypes = true;
  isMap = true;
  constructor(private http: HttpClient) {
  }

  ionViewDidEnter() {
    /*
	this.http.get('http://localhost:5000/marker/roads')
		 .subscribe(data => {
		   this.setFakeRoadMarkers(data, this.map);
		 });
	*/
  }


  showForm() {
    this.showTypes = true;
  }

  clearMarkers() {
  }

  ionViewWillLeave() {
    this.map.remove();
  }
}
