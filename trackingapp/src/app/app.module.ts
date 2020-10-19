import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbButtonModule,
  NbIconModule,
  NbMenuModule,
  NbActionsModule,
  NbInputModule,
  NbDatepickerModule,
  NbSelectModule,
  NbPopoverModule,
  NbToastrModule,
  NbBadgeModule,
  NbDialogModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { StoreModule } from '@ngrx/store';
import { AuthModule} from './auth/auth.module';
import { CoreModule } from './core/core.module';

import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import {MenuModule} from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { AccountModule } from './account/account.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    AuthModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    NbIconModule,
    NbMenuModule.forRoot(),
    NbActionsModule,
    NbInputModule,
    NbDatepickerModule.forRoot(),
    NbSelectModule,
    NbPopoverModule,
    NbToastrModule.forRoot(),
    StoreModule.forRoot({}, {}),
    TableModule,
    NbBadgeModule,
    NbDialogModule.forRoot(),
    CoreModule,
    EffectsModule.forRoot([]),
    MenuModule,
    ButtonModule,
    AccountModule,
    StoreDevtoolsModule.instrument({ name: 'Tracking App', maxAge: 25, logOnly: environment.production })
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
