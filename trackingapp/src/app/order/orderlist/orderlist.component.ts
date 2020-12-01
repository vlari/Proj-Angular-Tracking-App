import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SystemService } from 'src/app/core/services/system.service';
import { Order } from 'src/app/shared/models/order.model';
import { OrderDataService } from '../order-data.service';
import { OrderpackagelistComponent } from '../orderpackagelist/orderpackagelist.component';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss'],
})
export class OrderlistComponent implements OnInit {
  orders: Order[] | any = [];
  pagination: any;
  totalRecords: number;
  orderForm: FormGroup;
  columns: any = [];

  constructor(
    private orderDataService: OrderDataService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private systemService: SystemService
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      startDate: new Date(),
      endDate: new Date(),
    });

    this.columns = [
      { field: 'orderNumber', header: 'Order Number' },
      { field: 'date', header: 'Date' },
      { field: 'subtotal', header: 'Subtotal' },
      { field: 'salseTax', header: 'Sales Tax' },
      { field: 'total', header: 'Total' },
      { field: '', header: 'Packages' },
    ];

    this.search({});
  }

  loadOrders(event: LazyLoadEvent) {
    const direction =
      this.pagination?.nextPage || this.pagination?.previousPage;

    const page = event.first / event.rows + 1;

    const filter: any = {
      page,
      sortField: event.sortField,
      sortOrder: event.sortOrder === 1 ? 'ASC' : 'DESC',
    };

    const dateRange = this.getDateRangeValue();

    filter.startDate = dateRange?.startDate;
    filter.endDate = dateRange?.endDate;

    this.search(filter);
  }

  search(filter: any) {
    this.orderDataService.getOrders(filter).subscribe(
      (response: any) => {
        this.orders = response.data;
      },
      (error: any) => console.log(error)
    );
  }

  onFilter() {
    const filter: any = {};
    if (!this.orderForm.errors) {
      const dateRange = this.getDateRangeValue();
      filter.startDate = dateRange.startDate;
      filter.endDate = dateRange.endDate;
    }

    this.search(filter);
  }

  onSelectDetails(selectedOrder: any) {
    const dialogRef = this.dialogService.open(OrderpackagelistComponent, {
      data: {
        isReadOnly: true,
        packages: selectedOrder.Packages,
      },
      header: 'Packages',
      width: '30%',
      height: 'auto',
    });
  }

  getDateRangeValue() {
    const startValue = this.orderForm.get('startDate').value;
    const endValue = this.orderForm.get('endDate').value;

    let dateRange: any = {};

    dateRange['startDate'] = startValue
      ? this.systemService.getDateFormatted(new Date(startValue))
      : null;
    dateRange['endDate'] = startValue
      ? this.systemService.getDateFormatted(new Date(endValue))
      : null;

    return dateRange;
  }
}
