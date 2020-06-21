import { Component } from "@angular/core";
import { ParkingService } from "../services/parking.service";
import "../../../node_modules/leaflet/dist/leaflet.css";
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import * as Leaflet from "leaflet";
const car1 = "assets/img/parking/car1.png";
const car2 = "assets/img/parking/car2.png";
const car3 = "assets/img/parking/car3.png";
const road1 = "assets/img/parking/road1.png";
const parkingSign = "assets/img/parking/parking.png";
const iconRetinaUrl = "assets/marker-icon-2x.png";
const iconUrl = "assets/marker-icon.png";
const shadowUrl = "assets/marker-shadow.png";
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
  selector: "page-search",
  templateUrl: "search.page.html",
  styleUrls: ["./search.page.scss"],
})
export class SearchPage {
  map: Leaflet.Map;
  parkingSpots = [];
  public showTypes = true;
  isMap = true;
  constructor(public parkingService: ParkingService, private http: HttpClient) {
    this.parkingSpots = parkingService.getAll();
  }

  ionViewDidEnter() {
    this.map = Leaflet.map("mapParking", {
      crs: Leaflet.CRS.Simple,
      minZoom: -5,
    });

    const bounds = [
      [0, 0],
      [1000, 1000],
    ];

    this.map.fitBounds(bounds);
    this.setFakeMarkers();

	this.http.get('http://localhost:5000/marker/roads')
		 .subscribe(data => {
		   this.setFakeRoadMarkers(data, this.map);
		 });
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


  setFakeRoadMarkers(roads, map) {
    Leaflet.Marker.prototype.options.icon = iconDefault;
    const road1sz = xy(40, 51);

	roads.forEach(function (value) {
		Leaflet.marker(road1sz, {
	      icon: Leaflet.icon({
		    iconSize: value.iconSize,
			iconAnchor: value.iconAnchor,
			iconUrl: road1,
		  })
        }).addTo(map);
	});
  }

  setFakeMarkers() {
    Leaflet.Marker.prototype.options.icon = iconDefault;
    const sol = xy(175, 145);
    const mizar = xy(41.6, 130.1);
    const kruegerZ = xy(13.4, 56.5);
    const deneb = xy(218, 8);
    const sol2 = xy(275, 145);

    Leaflet.marker(sol, {
      icon: Leaflet.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: car1,
      }),
    })
      .addTo(this.map)
      .bindPopup("Sol");
    Leaflet.marker(mizar, {
      icon: Leaflet.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: car2,
      }),
    })
      .addTo(this.map)
      .bindPopup("Mizar");
    Leaflet.marker(kruegerZ, {
      icon: Leaflet.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: car3,
      }),
    })
      .addTo(this.map)
      .bindPopup("Krueger-Z");
    Leaflet.marker(deneb, {
      icon: Leaflet.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: parkingSign,
      }),
    })
      .addTo(this.map)
      .bindPopup("Deneb");

    Leaflet.marker(sol2, {
      icon: Leaflet.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: car1,
      }),
    })
      .addTo(this.map)
      .bindPopup("Sol 2");

    Leaflet.polyline([sol, deneb]).addTo(this.map);
  }

  showForm() {
    this.showTypes = true;
  }

  clearMarkers() {
    if (this.isMap === true) {
      {
        // For each layer on the map remove everything and clear variables
        this.map.eachLayer(function (layer) {
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
