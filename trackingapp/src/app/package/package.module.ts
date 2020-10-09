import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageRoutingModule } from './package-routing.module';
import { PackagelistComponent } from './packagelist/packagelist.component';
import { StoreModule } from '@ngrx/store';

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
  NbTooltipModule,
} from '@nebular/theme';
import { SharedModule } from '../shared/shared.module';
import { PackagetrackmapComponent } from './packagetrackmap/packagetrackmap.component';
import { PackagedetailComponent } from './packagedetail/packagedetail.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { RatecalculatorComponent } from './ratecalculator/ratecalculator.component';
import { packageReducer } from './state/package.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PackageEffect } from './state/package.effects';

@NgModule({
  declarations: [
    PackagelistComponent,
    PackagetrackmapComponent,
    PackagedetailComponent,
    RatecalculatorComponent,
  ],
  imports: [
    CommonModule,
    PackageRoutingModule,
    SharedModule,
    StoreModule.forFeature('packages', packageReducer),
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
    EffectsModule.forFeature([PackageEffect])
  ],
  entryComponents: [PackagedetailComponent],
})
export class PackageModule {}
