import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { getSelectedPackages, State } from '../state/order.reducer';
import * as OrderActions from '../state/order.actions';
import { PackageDataService } from 'src/app/package/package-data.service';
import { Package } from 'src/app/shared/models/package.model';

@Component({
  selector: 'app-orderpackagelist',
  templateUrl: './orderpackagelist.component.html',
  styleUrls: ['./orderpackagelist.component.scss'],
})
export class OrderpackagelistComponent implements OnInit {
  availablePackages = [];
  isReadOnly = false;

  constructor(
    private dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private store: Store<State>,
    private packageDataService: PackageDataService
  ) {}

  ngOnInit(): void {
    const orderPackageList = this.config.data.packages;

    if (orderPackageList) {
      this.availablePackages = orderPackageList;
    } else {
      this.loadPackages();
    }

    this.isReadOnly = !this.config.data.isReadOnly;
  }

  loadPackages(): void {
    this.store.select(getSelectedPackages).subscribe(
      (response: any) => {
        const cart = response || [];

        this.packageDataService
          .getOrderPackages()
          .subscribe((response: any) => {
            if (cart.length) {
              response.data.forEach((p) => {
                if (!cart.some((c) => c.trackingNumber === p.trackingNumber)) {
                  this.availablePackages.push(p);
                }
              });
            } else {
              this.availablePackages = response.data;
            }

            this.isReadOnly = !this.config.data.isReadOnly;
          });
      },
      (error: any) => console.log(error)
    );
  }

  onAddPackage(selectedPackage: Package): void {
    this.store.dispatch(OrderActions.addPackage({ package: selectedPackage }));
    this.dialogRef.close();
  }

  dismiss(): void {
    this.dialogRef.close();
  }
}
