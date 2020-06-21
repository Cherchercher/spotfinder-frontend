import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { PARKING_SPOTS } from './mock-parking';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  private parkingSpots: any;

  constructor(private http: HttpClient) {
	this.http.get('http://localhost:5000/mock-spots')
		 .subscribe(data => {
			this.parkingSpots = data;
		  });
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

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
