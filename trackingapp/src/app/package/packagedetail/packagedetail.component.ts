import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-packagedetail',
  templateUrl: './packagedetail.component.html',
  styleUrls: ['./packagedetail.component.scss'],
})
export class PackagedetailComponent implements OnInit {
  selectedPackage;

  constructor(
    private dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.selectedPackage = this.config.data.package;
  }

  dismiss() {
    this.dialogRef.close();
  }
}
