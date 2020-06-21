import { Component } from "@angular/core";

import { ParkingService } from "../services/parking.service";

import "../../../node_modules/leaflet/dist/leaflet.css";
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import * as Leaflet from "leaflet";
const iconRetinaUrl = "assets/marker-icon-2x.png";
const iconUrl = "assets/marker-icon.png";
const shadowUrl = "assets/marker-shadow.png";

const car1 = "assets/img/parking/car1.png";
const forward = "assets/img/navigation/gps-forward.png";
const left = "assets/img/navigation/gps-left.png";
const right = "assets/img/navigation/gps-right.png";
const spot = "assets/img/navigation/gps-parking.png";

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

@Component({
  selector: "page-navigate",
  templateUrl: "navigate.page.html",
  styleUrls: ["./navigate.page.scss"],
})
export class NavigatePage {
  public imageName = forward;
  public showTypes = true;
  public directions = "Calculating path to free spot";
  isMap = true;
  constructor(private http: HttpClient) {
  }

  ionViewDidEnter() {
	this.http.get('http://localhost:5000/navigate/route')
		 .subscribe(data => {
		   this.navigate(data);
		 });
  }

  navigate(path) {
	if (path.length === 1) {
		this.directions = "Welcome to your parking spot!"
		this.imageName = spot;
		return;
	}

	let first_el = path[0];

	let time = 2000;
	if (first_el.move === "no") {
		if (first_el.turn === "right") {
			this.imageName = right;
		} else {
			this.imageName = left;
		}
		this.directions = "Turn " + first_el.turn;
		time = 2000;
	} else {
		this.imageName = forward;
		this.directions = "Move forward by " + first_el.steps * 100 + " m";
		time = first_el.steps * 2000;
	}

	// for each path generate a message, set image and wait for a bit
	setTimeout(() => {
		console.log(first_el);
		this.navigate(path.filter(obj => obj !== first_el))
	  }, time);
  }

  showForm() {
    this.showTypes = true;
  }

  clearMarkers() {
  }

  ionViewWillLeave() {
  }
}
