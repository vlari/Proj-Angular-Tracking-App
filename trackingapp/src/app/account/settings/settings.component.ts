import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { forkJoin } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SystemService } from 'src/app/core/services/system.service';
import { AccountDataService } from '../account-data.service';
import { getCurrentUser } from '../../auth/state/auth.reducer';
import { Store } from '@ngrx/store';
import { State } from '../../state/app.state';
import * as AuthActions from '../../auth/state/auth.actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  securityForm: FormGroup;
  documentTypes: any;
  paymentOptions: any;
  facilities: any;
  emailValidation;
  currentUser;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private accountDataService: AccountDataService,
    private toastrService: NbToastrService,
    private systemService: SystemService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.systemService.getDocumentTypes(),
      this.systemService.getPaymentOptions(),
      this.systemService.getFacilities(),
    ]).subscribe(([documentResponse, paymentResponse, facilityResponse]) => {
      this.documentTypes = documentResponse.data;
      this.paymentOptions = paymentResponse.data;
      this.facilities = facilityResponse.data;
    });

    this.settingsForm = this.fb.group({
      name: '',
      lastName: '',
      dateOfBirth: new Date(),
      citizenId: '',
      email: ['', Validators.email],
      address: '',
      phone: '',
      DocumentTypeId: 1,
      PaymentOptionId: 1,
      FacilityId: 1,
    });

    this.securityForm = this.fb.group({
      passwordGroup: this.fb.group(
        {
          password: '',
          newPassword: ['', [Validators.required, Validators.minLength(8)]],
          confirmPassword: ['', [Validators.required]],
        },
        { validators: this.systemService.isSamePassword }
      ),
    });

    this.store.select(getCurrentUser).subscribe(
      (response: any) => {
        this.currentUser = response?.data;

        this.settingsForm.get('name').setValue(this.currentUser.name);
        this.settingsForm.get('lastName').setValue(this.currentUser.lastName);
        this.settingsForm
          .get('dateOfBirth')
          .setValue(new Date(this.currentUser.dateOfBirth));
        this.settingsForm.get('citizenId').setValue(this.currentUser.citizenId);
        this.settingsForm.get('email').setValue(this.currentUser.email);
        this.settingsForm.get('address').setValue(this.currentUser.address);
        this.settingsForm.get('phone').setValue(this.currentUser.phone);
        this.settingsForm
          .get('DocumentTypeId')
          .setValue(this.currentUser.DocumentType.id);
        this.settingsForm
          .get('PaymentOptionId')
          .setValue(this.currentUser.PaymentOption.id);
        this.settingsForm
          .get('FacilityId')
          .setValue(this.currentUser.Facility.id);

        this.loading = this.currentUser ? true : false;
      },
      (error: any) => console.log(error)
    );

    this.store.dispatch(AuthActions.loadUser());

    const emailControl = this.settingsForm.get('email');
    emailControl.valueChanges
      .pipe(debounceTime(2000))
      .subscribe((_value) => this.setEmailValidation(emailControl));
  }

  onSettingsSubmit() {
    let dateOfBirth = this.systemService.getDateFormatted(
      this.settingsForm.get('dateOfBirth').value
    );
    this.settingsForm.get('dateOfBirth').setValue(dateOfBirth);

    this.accountDataService.patchUser(this.settingsForm.value).subscribe(
      (_data) => {
        const toastrConfig: any = this.systemService.getToastrConfig(
          'checkmark-circle-2-outline',
          'success'
        );
        this.toastrService.show(
          '',
          'Account changed successfully',
          toastrConfig
        );
      },
      (error) => {
        const toastrConfig: any = this.systemService.getToastrConfig(
          'close-circle-outline',
          'danger'
        );
        this.toastrService.show('', error.message, toastrConfig);
      }
    );
  }

  onPasswordSubmit() {
    const passwordGroup = this.securityForm.get('passwordGroup');
    if (passwordGroup.valid) {
      this.accountDataService
        .patchPassword(
          passwordGroup.get('password').value,
          passwordGroup.get('newPassword').value
        )
        .subscribe(
          (_data) => {
            const toastrConfig: any = this.systemService.getToastrConfig(
              'checkmark-circle-2-outline',
              'success'
            );
            this.toastrService.show(
              '',
              'Password changed successfully',
              toastrConfig
            );
          },
          (error) => {
            const toastrConfig: any = this.systemService.getToastrConfig(
              'close-circle-outline',
              'danger'
            );
            this.toastrService.show('', error.message, toastrConfig);
          }
        );
    }
  }

  setEmailValidation(control: AbstractControl) {
    this.emailValidation =
      (control.touched || control.dirty) && control.errors ? 'danger' : 'basic';
  }
}
