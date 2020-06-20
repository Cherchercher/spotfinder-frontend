import {Injectable} from '@angular/core';
import {GATEWAYS} from './mock-gateways';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  private gateways: any;

  constructor() {
    this.gateways = GATEWAYS;
  }

  getAll() {
    return this.gateways;
  }

  getItem(id) {
    for (const gateway of this.gateways) {
      if (gateway.id === parseInt(id, 0)) {
        return gateway;
      }
    }
    return null;
  }

  remove(item) {
    this.gateways.splice(this.gateways.indexOf(item), 1);
  }
}
