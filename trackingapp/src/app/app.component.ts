import { Component } from '@angular/core';

import { NbSidebarService } from '@nebular/theme';
import { NbMenuItem } from '@nebular/theme';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  items: NbMenuItem[] = [
    {
      title: 'Packages',
      icon: 'cube',
      expanded: false,
      children: [
        {
          title: 'Package List',
          link: 'packages'
        },
        {
          title: 'Rate Calculator',
          link: 'packages/calculator'
        }
      ],
    },
    {
      title: 'Billing',
      icon: 'shopping-cart',
      expanded: false,
      children: [
        {
          title: 'Billing',
          link: 'orders/billing'
        },
        {
          title: 'Orders',
          link: 'orders/list'
        }
      ],
    },
    {
      title: 'Delivery',
      icon: 'car'
    },
  ];

  constructor(private sidebarService: NbSidebarService) {
  }

  toggle() {
    this.sidebarService.toggle(false, 'left');
  }
}
