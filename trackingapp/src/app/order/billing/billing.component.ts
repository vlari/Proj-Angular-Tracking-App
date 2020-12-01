import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getSelectedPackages, State } from '../state/order.reducer';
import { Store } from '@ngrx/store';
import { Package } from 'src/app/shared/models/package.model';
import * as OrderActions from '../state/order.actions';
import { getCurrentUser } from 'src/app/auth/state/auth.reducer';
import { SystemService } from 'src/app/core/services/system.service';
import { OrderDataService } from '../order-data.service';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { OrderpackagelistComponent } from '../orderpackagelist/orderpackagelist.component';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  orderForm: FormGroup;
  TAX: string = '5.95';
  columns: { field: string; header: string }[];
  currentUser;
  currentDate;
  isDetailDisabled = true;

  selectedPackages: {
    trackingNumber: string;
    date: string;
    weight: string;
    service: string;
  }[];

  orderPackages: Package[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    private systemService: SystemService,
    private orderDataService: OrderDataService,
    private toastrService: NbToastrService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      subtotal: [0, Validators.required],
      salesTax: [0, Validators.required],
      total: [0, Validators.required],
    });

    this.columns = [
      { field: 'trackingNumber', header: 'Tracking Number' },
      { field: 'date', header: 'Date' },
      { field: 'weight', header: 'Weight' },
      { field: 'service', header: 'Service' },
      { field: '', header: '' },
    ];

    this.store.select(getSelectedPackages).subscribe(
      (data: any) => {
        this.orderPackages = data;
      },
      (error: any) => console.log(error)
    );

    this.store.select(getCurrentUser).subscribe(
      (response: any) => (this.currentUser = response?.data),
      (error: any) => console.log(error)
    );

    this.currentDate = this.systemService.getDateFormatted(new Date());

    this.setAmount();
  }

  onSubmit() {
    if (this.orderPackages.length) {
      const trackingNumbers = this.orderPackages.map((p) => p.trackingNumber);
      const order = {
        ...this.orderForm.value,
        ...{ packages: trackingNumbers },
      };

      this.orderDataService.placeOrder(order).subscribe(
        (_data: any) => {
          const toastrConfig: any = this.systemService.getToastrConfig(
            'checkmark-circle-2-outline',
            'success'
          );
          this.toastrService.show('', 'Order Placed!', toastrConfig);
          this.router.navigate(['/packages']);
        },
        (error: any) => {
          const toastrConfig: any = this.systemService.getToastrConfig(
            'close-circle-outline',
            'danger'
          );
          this.toastrService.show('', error.message, toastrConfig);
        }
      );
    }
  }

  onRemovePackage(selectedPackage: any) {
    this.store.dispatch(
      OrderActions.removePackage({
        trackingNumber: selectedPackage.trackingNumber,
      })
    );

    this.setAmount();
  }

  setAmount() {
    if (this.orderPackages.length) {
      let subtotal = 0;
      let priceDetails = [];

      this.orderPackages.forEach((p) => {
        const dimensionValue =
          parseFloat(p.length) * parseFloat(p.height) * parseFloat(p.width);
        priceDetails.push(dimensionValue + parseFloat(p.weight));
      });

      priceDetails.forEach((p) => (subtotal += p));

      const destinationPrice = this.systemService.getDestinationPrice(
        this.currentUser.Facility.id
      );

      subtotal += parseFloat(destinationPrice);
      const salesTax = subtotal + parseFloat(this.TAX);
      const total = subtotal + salesTax;

      this.orderForm.get('subtotal').setValue(subtotal.toFixed(2));
      this.orderForm.get('salesTax').setValue(salesTax.toFixed(2));
      this.orderForm.get('total').setValue(total.toFixed(2));
    } else {
      this.resetAmount();
    }
  }

  showPackageModal() {
    const dialogRef = this.dialogService.open(OrderpackagelistComponent, {
      data: {
        isReadOnly: false,
      },
      header: 'Available Packages',
      width: '30%',
      height: 'auto',
    });

    dialogRef.onClose.subscribe((data: any) => this.setAmount());
  }

  resetAmount() {
    this.orderForm.get('subtotal').setValue(0);
    this.orderForm.get('salesTax').setValue(0);
    this.orderForm.get('total').setValue(0);
  }
}
