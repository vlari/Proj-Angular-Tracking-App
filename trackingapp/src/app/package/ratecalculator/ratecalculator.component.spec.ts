import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatecalculatorComponent } from './ratecalculator.component';

describe('RatecalculatorComponent', () => {
  let component: RatecalculatorComponent;
  let fixture: ComponentFixture<RatecalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatecalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatecalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
