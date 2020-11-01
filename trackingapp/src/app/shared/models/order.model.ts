import { Package } from './package.model';

export interface Order {
    orderNumber: string;
    date: string;
    paymentOption: string;
    subtotal: string;
    salesTax: string;
    total: string;
    Packages: Package[];
}
