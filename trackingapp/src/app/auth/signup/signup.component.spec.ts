import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { StoreModule } from '@ngrx/store';
import { AuthDataService } from '../auth-data.service';
import { authReducer } from '../state/auth.reducer';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, StoreModule.forRoot({}), StoreModule.forFeature('user', authReducer)],
      declarations: [ SignupComponent ],
      providers:[
        AuthDataService,
        NbToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
