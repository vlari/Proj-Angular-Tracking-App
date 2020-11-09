import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { AuthDataService } from '../auth-data.service';
import { AuthState } from '../state/auth.reducer';
import * as AuthActions from '../state/auth.actions';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authDataService: AuthDataService,
    private toastrService: NbToastrService,
    private cookieService: CookieService,
    private router: Router,
    private systemService: SystemService,
    private store: Store<AuthState>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      const toastrConfig: any = this.systemService.getToastrConfig(
        'close-circle-outline',
        'danger'
      );
      this.toastrService.show(
        '',
        'Please fill all the fields with the right data.',
        toastrConfig
      );
    } else {
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;
      this.authDataService.login(email, password).subscribe(
        (response: any) => {
          this.cookieService.set('userToken', response.userToken);
          this.store.dispatch(AuthActions.loadUser());
          this.router.navigate(['/packages']);
        },
        (error: any) => {
          const toastrConfig: any = this.systemService.getToastrConfig(
            'close-circle-outline',
            'danger'
          );
          this.toastrService.show('', error.message, toastrConfig);
        }
      );
    }
  }
}
