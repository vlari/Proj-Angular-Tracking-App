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
  NbDatepickerModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbTooltipModule } from '@nebular/theme';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { orderReducer } from './state/order.reducer';
import { SharedModule } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { OrderpackagelistComponent } from './orderpackagelist/orderpackagelist.component';

@NgModule({
  declarations: [BillingComponent, OrderlistComponent, OrderpackagelistComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    DynamicDialogModule,
    NbDatepickerModule,
    NbFormFieldModule,
    StoreModule.forFeature('order', orderReducer)
  ],
  entryComponents: [OrderpackagelistComponent],
  providers: [DialogService]
})
export class OrderModule { }
