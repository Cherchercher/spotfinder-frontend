import { Injectable } from '@angular/core';
import { PARKING_SPOTS } from './mock-parking';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  private parkingSpots: any;

  constructor() {
    this.parkingSpots = PARKING_SPOTS;
  }

  getAll() {
    return this.parkingSpots;
  }

  getItem(id) {
    for (const parkingSpot of this.parkingSpots) {
      if (parkingSpot.id === parseInt(id, 0)) {
        return parkingSpot;
      }
    }
    return null;
  }

  remove(item) {
    this.parkingSpots.splice(this.parkingSpots.indexOf(item), 1);
  }
}
