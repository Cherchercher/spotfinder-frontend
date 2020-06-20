import {Injectable} from '@angular/core';
import {ACTIVITIES} from './mock-activities';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activities: any;

  constructor() {
    this.activities = ACTIVITIES;
  }

  getAll() {
    return this.activities;
  }

  getItem(id) {
    for (const activity of this.activities) {
      if (activity.id === parseInt(id, 0)) {
        return activity;
      }
    }
    return null;
  }

  remove(item) {
    this.activities.splice(this.activities.indexOf(item), 1);
  }
}
