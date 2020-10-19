import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbPopoverModule,
  NbTabsetModule,
  NbInputModule,
  NbDatepickerModule,
  NbSelectModule
} from '@nebular/theme';
import { SharedModule } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NbTabsetModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbPopoverModule,
  ],
})
export class AccountModule {}
