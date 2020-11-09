import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NbButtonModule, NbToastrService } from '@nebular/theme';
import { SystemService } from 'src/app/core/services/system.service';

import { RatecalculatorComponent } from './ratecalculator.component';

describe('RatecalculatorComponent', () => {
  let component: RatecalculatorComponent;
  let fixture: ComponentFixture<RatecalculatorComponent>;
  const fb: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientModule, NbButtonModule ],
      declarations: [ RatecalculatorComponent ],
      providers: [ NbToastrService, SystemService, {
        provide: FormBuilder, useValue: fb
      } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatecalculatorComponent);
    component = fixture.componentInstance;
    component.rateForm = fb.group({
      merchValue: ['', [Validators.required, Validators.min(1)]],
      weight: ['', [Validators.required, Validators.min(1)]],
      dimensions: fb.group({
        length: [0, [Validators.required, Validators.min(1)]],
        width: [0, [Validators.required, Validators.min(1)]],
        height: [0, [Validators.required, Validators.min(1)]],
      }),
      destination: [1, Validators.required]
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
