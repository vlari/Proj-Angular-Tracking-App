import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingComponent } from './billing/billing.component';
import { OrderlistComponent } from './orderlist/orderlist.component';

const routes: Routes = [
  {
    path: '',
    component: OrderlistComponent
  },
  {
    path: 'list',
    component: OrderlistComponent
  },
  {
    path: 'billing',
    component: BillingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
