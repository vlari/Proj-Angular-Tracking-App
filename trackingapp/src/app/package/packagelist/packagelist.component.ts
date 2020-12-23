import { Component, OnInit } from '@angular/core';
import { Package } from 'src/app/shared/models/package.model';
import { PackageDataService } from '../package-data.service';
import { SettingsService } from '../../shared/services/settings.service';
import { LazyLoadEvent } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackagedetailComponent } from '../packagedetail/packagedetail.component';
import { DialogService } from 'primeng/dynamicdialog';
import { Store } from '@ngrx/store';
import { State, getPackages } from '../state/package.reducer';
import * as PackageActions from '../state/package.actions';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-packagelist',
  templateUrl: './packagelist.component.html',
  styleUrls: ['./packagelist.component.scss'],
  providers: [DialogService],
})
export class PackagelistComponent implements OnInit {
  packages: Package[];
  selectedOrderPackages: Package[];
  pagination: any;
  totalRecords: number;
  packageForm: FormGroup;
  columns: any = [];
  isFiltered = false;

  constructor(
    private packageDataService: PackageDataService,
    private settingsService: SettingsService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.store.select(getPackages).subscribe(
      (response: any) => {
        this.packages = response.data;
        this.totalRecords = response.count;
        this.pagination = response.pagination;
      },
      (error: any) => console.log(error)
    );

    this.store.dispatch(PackageActions.loadPendingPackages());

    this.packageForm = this.fb.group({
      trackingNumber: [
        '',
        [Validators.minLength(36), Validators.maxLength(36)],
      ],
    });

    this.columns = [
      { field: 'trackingNumber', header: 'Tracking Number' },
      { field: 'date', header: 'Date' },
      { field: 'weight', header: 'Weight' },
      { field: 'service', header: 'Service' },
      { field: 'status', header: 'Status' },
      // { field: '', header: 'GeoLocation' },
    ];

    const trackingNumberControl = this.packageForm.get('trackingNumber');
    trackingNumberControl.valueChanges
      .pipe(debounceTime(2000))
      .subscribe((_value) => this.isFiltered = trackingNumberControl.value ? true : false);
  }

  loadPackages(event: LazyLoadEvent) {
    const direction =
      this.pagination?.nextPage || this.pagination?.previousPage;

    const page = event.first / event.rows + 1;

    const filter: any = {
      page,
      sortField: event.sortField,
      sortOrder: event.sortOrder === 1 ? 'ASC' : 'DESC',
    };

    if (!this.packageForm.errors) {
      filter.trackingNumber = this.packageForm.get('trackingNumber').value;
    }

    this.search(filter);
  }

  getStatusColor(status: string): string {
    return this.settingsService.getColorByStatus(status);
  }

  search(filter: any) {
    this.packageDataService.getPackages(filter).subscribe(
      (response: any) => {
        this.packages = response.data;
      },
      (error: any) => console.log(error)
    );
  }

  onFilter() {
    const filter: any = {};
    if (!this.packageForm.errors) {
      filter.trackingNumber = this.packageForm.get('trackingNumber').value;
    }

    this.search(filter);
  }

  onSelectDetails(selectedPackage: any) {
    this.packageDataService
      .getLocationName({
        longitude: selectedPackage.longitude,
        latitude: selectedPackage.latitude,
      })
      .subscribe(
        (response: any) => {
          selectedPackage.location = this.getLocation(response.features);
          const dialogRef = this.dialogService.open(PackagedetailComponent, {
            data: {
              package: selectedPackage,
            },
            header: 'GeoTracking',
            width: '70%',
            height: '70%',
          });
        },
        (error: any) => console.log(error)
      );
  }

  getLocation(geoResponse: any) {
    let location = {};

    geoResponse.forEach((feature) => {
      location[feature.place_type] = feature.place_name;
    });

    return location;
  }

  isPackageSelected(tablePackage: any) {
    const resultPackage = this.selectedOrderPackages.find(
      (p) => p.trackingNumber === tablePackage.trackingNumber
    );
    const isSelected = resultPackage ? true : false;
    return isSelected;
  }

  resetForm(): void {
    this.packageForm.get('trackingNumber').setValue('');
    this.onFilter();
  }
}
