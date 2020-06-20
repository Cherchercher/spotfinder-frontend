import {Component} from '@angular/core';
import {ContactService} from '../services/contact.service';
import {Router} from '@angular/router';


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'app-find-friend',
  templateUrl: './find-friend.page.html',
  styleUrls: ['./find-friend.page.scss'],
})
export class FindFriendPage {
  // contacts
  public contacts;

  constructor(public router: Router, public contactService: ContactService) {
    // set sample data
    this.contacts = contactService.getAll();
  }
}
