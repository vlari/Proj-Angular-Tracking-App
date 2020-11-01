import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
  UrlSegment,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState, getCurrentUser } from './state/auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private store: Store<AuthState>) {}

  canLoad(route: Route, segments: UrlSegment[]): any {
    return this.checkUserState();
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.checkUserState();
  }

  checkUserState() {
    return this.store.select(getCurrentUser).subscribe((response: any) => {
      let isLoggedIn;

      if (response?.data) {
        isLoggedIn = true;
      } else {
        isLoggedIn = false;
        this.router.navigate(['login']);
      }
      return isLoggedIn;
    });
  }
}
