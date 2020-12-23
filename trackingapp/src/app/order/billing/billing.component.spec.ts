import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { StoreModule } from '@ngrx/store';
import { SystemService } from 'src/app/core/services/system.service';
import { orderReducer } from '../state/order.reducer';

import { BillingComponent } from './billing.component';

describe('BillingComponent', () => {
  let component: BillingComponent;
  let fixture: ComponentFixture<BillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientModule, StoreModule.forRoot({}), StoreModule.forFeature('order', orderReducer) ],
      declarations: [ BillingComponent ],
      providers: [ SystemService, { providers: NbToastrService, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
