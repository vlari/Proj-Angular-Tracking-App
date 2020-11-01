import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';
import { SettingsComponent } from './account/settings/settings.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'packages',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./package/package.module')
        .then(m => m.PackageModule)
  },
  {
    path: 'orders',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./order/order.module')
        .then(m => m.OrderModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'passwordreset',
    component: ResetpasswordComponent
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    component: SettingsComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
