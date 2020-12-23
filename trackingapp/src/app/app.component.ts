import { Component, OnInit } from '@angular/core';

import { NbSidebarService } from '@nebular/theme';
import { NbMenuItem } from '@nebular/theme';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Store } from '@ngrx/store';
import { State } from './state/app.state';
import { getCurrentUser } from './auth/state/auth.reducer';
import { AuthDataService } from './auth/auth-data.service';
import { Router } from '@angular/router';
import * as AuthActions from './auth/state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userItems: MenuItem[];
  sideBarItems: NbMenuItem[] = [
    {
      title: 'Packages',
      icon: 'cube',
      expanded: false,
      children: [
        {
          title: 'Package List',
          link: 'packages',
        },
        {
          title: 'Rate Calculator',
          link: 'packages/calculator',
        },
      ],
    },
    {
      title: 'Billing',
      icon: 'shopping-cart',
      expanded: false,
      children: [
        {
          title: 'Billing',
          link: 'orders/billing',
        },
        {
          title: 'Orders',
          link: 'orders/list',
        },
      ],
    }
  ];
  currentUser;

  constructor(
    private sidebarService: NbSidebarService,
    private primengConfig: PrimeNGConfig,
    private store: Store<State>,
    private authDataService: AuthDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.store.select(getCurrentUser).subscribe(
      (response: any) => {
        this.currentUser = response?.data;
        this.userItems = [
          { label: `${this.currentUser?.name} - ${this.currentUser?.code}`, icon: 'pi pi-id-card' },
          { label: 'Settings', icon: 'pi pi-cog', routerLink: ['/settings'] },
          {
            label: 'Sign Out',
            command: (e: any) => {
              this.authDataService.signOut();
              this.store.dispatch(AuthActions.deleteSession());
              this.router.navigate(['/login']);
            },
          },
        ];
      },
      (error: any) => console.log(error)
    );

    this.store.dispatch(AuthActions.loadUser());
  }

  toggle() {
    this.sidebarService.toggle(false, 'left');
  }
  
}
