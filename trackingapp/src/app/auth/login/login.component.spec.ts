import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NbOverlayModule, NbOverlayService, NbThemeModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { StoreModule } from '@ngrx/store';
import { AuthDataService } from '../auth-data.service';
import { authReducer } from '../state/auth.reducer';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        NbToastrModule.forRoot({}),
        StoreModule.forRoot({}),
        StoreModule.forFeature('user', authReducer),
      NbOverlayModule],
      declarations: [ LoginComponent ],
      providers:[
        AuthDataService,
        NbThemeModule.forRoot().providers,
        NbToastrService
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
