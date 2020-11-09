import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { SystemService } from 'src/app/core/services/system.service';
import { AuthDataService } from '../auth-data.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent implements OnInit {
  emailForm: FormGroup;

  constructor(
    private authDataService: AuthDataService,
    private fb: FormBuilder,
    private systemService: SystemService,
    private toastrService: NbToastrService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  onSubmit() {
    if (this.emailForm.valid) {
      const email = this.emailForm.get('email').value;
      this.authDataService.sendEmail(email).subscribe(
        (response: any) => {
          const toastrConfig: any = this.systemService.getToastrConfig(
            'checkmark-circle-2-outline',
            'success'
          );
          this.toastrService.show(
            '',
            'We sent you an email to reset your password.',
            toastrConfig
          );
          this.route.navigate(['/login']);
        },
        (error: any) => {
          const toastrConfig: any = this.systemService.getToastrConfig(
            'close-circle-outline',
            'danger'
          );
          this.toastrService.show('', error.message, toastrConfig);
        }
      );
    } else {
      const toastrConfig: any = this.systemService.getToastrConfig(
        'close-circle-outline',
        'danger'
      );
      this.toastrService.show('', 'You must type a valid email', toastrConfig);
    }
  }
}
