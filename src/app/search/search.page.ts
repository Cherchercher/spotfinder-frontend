import { Component } from "@angular/core";
import { ParkingService } from "../services/parking.service";
import "../../../node_modules/leaflet/dist/leaflet.css";
import { HttpClient } from "@angular/common/http";
import * as Leaflet from "leaflet";
const car1 = "assets/img/parking/car1.png";
const road1 = "assets/img/parking/road1.png";
const road2 = "assets/img/parking/road2.png";
const parkingSign = "assets/img/parking/parking.png";
const parkingSpot = "assets/img/parking/parkingspot.png";
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

    this.http
      .get("http://localhost:5000/marker/parking-spots")
      .subscribe((data) => {
        this.setFakeParkingSpotMarkers(data, this.map);
      });

    this.http.get("http://localhost:5000/marker/roads").subscribe((data) => {
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

  setFakeParkingSpotMarkers(spots, map) {
    Leaflet.Marker.prototype.options.icon = iconDefault;

    spots.forEach(function (value) {
      if (value.iconUrl === "parkingSpot1") {
        Leaflet.marker([value.iconAnchor[0], value.iconAnchor[1]], {
          icon: Leaflet.icon({
            iconSize: value.iconSize,
            iconUrl: parkingSpot,
          }),
        }).addTo(map);
      } else {
        Leaflet.marker([value.iconAnchor[0], value.iconAnchor[1]], {
          icon: Leaflet.icon({
            iconSize: [30, 40],
            iconUrl: car1,
          }),
          zIndexOffset: 1000,
        }).addTo(map);
      }
    });
  }

  setFakeRoadMarkers(roads, map) {
    Leaflet.Marker.prototype.options.icon = iconDefault;

    roads.forEach(function (value) {
      if (value.horizontal) {
        Leaflet.marker(xy(value.iconAnchor[0], value.iconAnchor[1]), {
          icon: Leaflet.icon({
            iconSize: value.iconSize,
            iconUrl: road2,
          }),
        }).addTo(map);
      } else {
        Leaflet.marker(xy(value.iconAnchor[0], value.iconAnchor[1]), {
          icon: Leaflet.icon({
            iconSize: value.iconSize,
            iconUrl: road1,
          }),
        }).addTo(map);
      }
    });
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
