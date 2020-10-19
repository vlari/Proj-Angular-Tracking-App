import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbPopoverModule,
  NbSelectModule,
} from '@nebular/theme';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './state/auth.reducer';
import { AuthEffect } from './state/auth.effects';

@NgModule({
  declarations: [LoginComponent, ResetpasswordComponent, SignupComponent],
  imports: [
    CommonModule,
    SharedModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbPopoverModule,
    StoreModule.forFeature('user', authReducer),
    EffectsModule.forFeature([AuthEffect]),
  ],
  exports: [LoginComponent, ResetpasswordComponent, SignupComponent],
})
export class AuthModule {}
