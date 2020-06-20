import {Injectable} from '@angular/core';
import {CONTACTS} from './mock-contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: any;

  constructor() {
    this.contacts = CONTACTS;
  }

  getAll() {
    return this.contacts;
  }

  getItem(id) {
    for (const contact of this.contacts) {
      if (contact.id === parseInt(id, 0)) {
        return contact;
      }
    }
    return null;
  }

  remove(item) {
    this.contacts.splice(this.contacts.indexOf(item), 1);
  }
}
