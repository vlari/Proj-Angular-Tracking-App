import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CookieService } from 'ngx-cookie-service';
import { AuthDataService } from '../auth-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authDataService: AuthDataService,
    private toastrService: NbToastrService,
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email]
      ],
      password: ['', [ 
        Validators.required,
        Validators.minLength(8)]
      ]
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      const toastrConfig: any = { 
        icon: 'close-circle-outline', 
        iconPack: 'eva', 
        status: 'danger',
        position: 'bottom-end' 
      };
      this.toastrService.show('', 'Please fill all the fields with the right data.', toastrConfig);
    } else {
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;
      this.authDataService.login(email, password)
        .subscribe(
          (response: any) => {
            this.cookieService.set('userToken', response.userToken);
            this.router.navigate(['/packages']);
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
        )
    }
  }
}
