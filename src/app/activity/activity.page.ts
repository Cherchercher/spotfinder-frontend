import {Component} from '@angular/core';
import {ActivityService} from '../services/activity.service';
import {Router} from '@angular/router';

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage {
  // activities
  public activities: any;

  constructor(public router: Router, public activityService: ActivityService) {
    // set sample data
    this.activities = activityService.getAll();
  }

  // make array with range is n
  range(n) {
    return [Math.round(n)];
  }

  // toggle like an activity
  toggleLike(activity) {
    activity.is_liked = !activity.is_liked;
  }
}
