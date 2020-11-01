import { Injectable } from '@angular/core';
import { Package } from '../models/package.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderPackages: Package[] = [];

  constructor() {}

  addOrderPackage(selectedPackage: Package) {
    this.orderPackages = [...this.orderPackages, selectedPackage];
  }

  removePackage(trackingNumber: string) {
    this.orderPackages = this.orderPackages.filter((p) => {
      return p.trackingNumber !== trackingNumber;
    });
  }
}
