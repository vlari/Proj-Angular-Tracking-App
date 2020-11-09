import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { SystemService } from 'src/app/core/services/system.service';
import { AuthDataService } from '../auth-data.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
})
export class ResetpasswordComponent implements OnInit {
  passwordForm: FormGroup;
  userDetail = {};

  constructor(
    private authDataService: AuthDataService,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private systemService: SystemService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      passwordGroup: this.fb.group(
        {
          newPassword: ['', [Validators.required, Validators.minLength(8)]],
          confirmPassword: ['', [Validators.required]],
        },
        { validators: this.systemService.isSamePassword }
      ),
    });

    this.userDetail = {
      id: parseInt(this.route.snapshot.paramMap.get('id')),
      token: this.route.snapshot.paramMap.get('token'),
    };
  }

  onChangePassword(): void {
    const passwordGroup = this.passwordForm.get('passwordGroup');
    if (passwordGroup.valid) {
      const passwordValue = this.passwordForm.get('passwordGroup.newPassword')
        .value;
      this.userDetail = {
        ...this.userDetail,
        requestedPassword: passwordValue,
      };

      this.authDataService.resetPassword(this.userDetail).subscribe(
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
}
