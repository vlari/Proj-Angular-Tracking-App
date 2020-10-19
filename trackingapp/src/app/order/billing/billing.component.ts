import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State, getOrderPackages } from '../state/order.reducer';
import * as OrderActions from '../state/order.actions';
import { Store } from '@ngrx/store';
import { Package } from 'src/app/shared/models/package.model';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  orderForm: FormGroup;
  TAX: string = '5.95';
  columns: { field: string; header: string }[];

  // packages = [
  //   {
  //     id: 18,
  //     trackingNumber: '194c9168-45da-42ef-b9e1-a1a103889b1c',
  //     date: '2020-05-10',
  //     weight: '6.80',
  //     service: 'Amazon',
  //   },
  //   {
  //     id: 15,
  //     trackingNumber: '3af8a6fe-d66a-49bf-a02f-e05be92348b6',
  //     date: '2020-06-12',
  //     weight: '10.40',
  //     service: 'Amazon',
  //   },
  //   {
  //     id: 16,
  //     trackingNumber: '3fe2b73a-425a-4410-8d38-861377d7e016',
  //     date: '2020-05-10',
  //     weight: '6.80',
  //     service: 'Amazon',
  //   },
  // ];

  selectedPackages: {
    trackingNumber: string;
    date: string;
    weight: string;
    service: string;
  }[];

  packages: Package[];

  constructor(private fb: FormBuilder,
    private store: Store<State>) {}

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

    this.store.select(getPackages).subscribe(
      (data: any) => {
        console.log('my packs', data);
      },
      (error: any) => console.log(error)
    );

    // this.store.dispatch(OrderActions.)

  }

  onSubmit() {

  }

  onRemovePackage(selectedPackage: any) {
    // this.packages = this.packages.filter(p => p.trackingNumber != selectedPackage.trackingNumber);


    console.log('selected Package', this.packages);
  }
}
