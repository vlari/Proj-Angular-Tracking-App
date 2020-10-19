import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { BillingComponent } from './billing/billing.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { TableModule } from 'primeng/table';
import { 
  NbAccordionModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbTooltipModule } from '@nebular/theme';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { orderReducer } from './state/order.reducer';
import { SharedModule } from 'primeng/api';

@NgModule({
  declarations: [BillingComponent, OrderlistComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    TableModule,
    NbBadgeModule,
    NbInputModule,
    NbIconModule,
    NbButtonModule,
    NbDialogModule.forChild(),
    NbCardModule,
    DynamicDialogModule,
    NbAccordionModule,
    NbCheckboxModule,
    NbSelectModule,
    NbTooltipModule,
    StoreModule.forFeature('order', orderReducer)
  ]
})
export class OrderModule { }
