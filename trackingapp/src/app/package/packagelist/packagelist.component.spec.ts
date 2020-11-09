import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { packageReducer } from '../state/package.reducer';

import { PackagelistComponent } from './packagelist.component';

describe('PackagelistComponent', () => {
  let component: PackagelistComponent;
  let fixture: ComponentFixture<PackagelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, ReactiveFormsModule, StoreModule.forRoot({}), StoreModule.forFeature('packages', packageReducer) ],
      declarations: [ PackagelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
