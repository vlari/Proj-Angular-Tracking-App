import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthDataService } from '../auth-data.service';
import { debounceTime } from 'rxjs/operators';
import { User } from '../../shared/models/user.model';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

function isSamePassword(c: AbstractControl): {[key: string]: boolean} | null {
  const password = c.get('password');
  const confirmPassword = c.get('confirmPassword');

  if (password.value !== confirmPassword.value) {
    return { 'match': true };
  }

  return null;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  documentTypes: DocumentType[];
  paymentOptions: PaymentOptions[];
  facilities: any;
  emailValidation;

  constructor(private fb: FormBuilder,
    private authDataService: AuthDataService,
    private toastrService: NbToastrService,
    private router: Router) { }

  ngOnInit(): void {

    // Replace this with the new version
    // of forkJoin because forkJoin
    // is deprecated.
    this.authDataService.getDocumentTypes()
      .subscribe(
        (response: any) => {
          this.documentTypes = response.data;
        },
        (error: any) => console.log(error)
      );

    this.authDataService.getPaymentOptions()
      .subscribe(
        (response: any) => {
          this.paymentOptions = response.data;
        },
        (error: any) => console.log(error)
      );

    this.authDataService.getFacilities()
      .subscribe(
        (response: any) => {
          this.facilities = response.data;
        },
        (error: any) => console.log(error)
      );

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: [new Date(), Validators.required],
      citizenId: ['', Validators.required],
      email: ['', [ Validators.required, Validators.email ]],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      passwordGroup: this.fb.group({
        password: ['',  [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['',  [Validators.required]]
      }, { validators: isSamePassword }),
      DocumentTypeId: [1, Validators.required],
      PaymentOptionId: [1, Validators.required],
      FacilityId: [1, Validators.required]
    });

    const emailControl = this.signupForm.get('email');
    emailControl.valueChanges.pipe(
      debounceTime(2000)
    ).subscribe(
      _value => this.setEmailValidation(emailControl)
    );

    const toastrConfig: any = { 
      icon: 'info-outline', 
      iconPack: 'eva', 
      status: 'primary',
      position: 'bottom-end' 
    };
    this.toastrService.show('', 'Please fill all the fields.', toastrConfig);
  }

  onSubmit() {
    if (!this.signupForm.valid) {
      const toastrConfig: any = { 
        icon: 'close-circle-outline', 
        iconPack: 'eva', 
        status: 'danger',
        position: 'bottom-end' 
      };
      this.toastrService.show('', 'Please fill all the fields with the right data.', toastrConfig);
    } else {
      // Formating date
      let d = new Date(this.signupForm.get('dateOfBirth').value);
      let dateOfBirth = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();

      this.signupForm.get('dateOfBirth').setValue(dateOfBirth);
      const user = new User(this.signupForm.value);

      this.authDataService.signUp(user)
        .subscribe(
          (_data: any) => {
            this.router.navigate(['/auth/login']);
          },
          (error: any) => {
            const toastrConfig: any = { 
              icon: 'close-circle-outline', 
              iconPack: 'eva', 
              status: 'danger',
              position: 'bottom-end' 
            };
            this.toastrService.show('', error.message, toastrConfig);
          }
        );
    }

  }

  setEmailValidation(control: AbstractControl) {
    this.emailValidation = (control.touched || control.dirty) && control.errors
      ? 'danger'
      : 'basic';
  }
}
