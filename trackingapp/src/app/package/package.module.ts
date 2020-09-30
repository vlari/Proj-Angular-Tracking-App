import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageRoutingModule } from './package-routing.module';
import { PackagelistComponent } from './packagelist/packagelist.component';


@NgModule({
  declarations: [PackagelistComponent],
  imports: [
    CommonModule,
    PackageRoutingModule
  ]
})
export class PackageModule { }
