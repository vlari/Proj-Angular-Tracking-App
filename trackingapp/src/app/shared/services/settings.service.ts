import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  getColorByStatus(status: string): string {
    let color = '';
    switch (status) {
      case 'Delivered':
        color = 'info';
        break;
      case 'In Facility':
        color = 'success';
        break;
      case 'Shipped':
        color = 'warning';
        break;
      case 'Stopped':
        color = 'danger';
        break;
      default:
        color = 'basic'
        break;
    }

    return color;
  }

}
