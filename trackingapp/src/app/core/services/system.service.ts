import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpCollectionResponse } from '../../shared/models/http-collection-response.model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private http: HttpClient) { }

  getDocumentTypes(): Observable<HttpCollectionResponse<DocumentType>> {
    return this.http.get<HttpCollectionResponse<DocumentType>>(
      `${environment.baseUrl}/documenttypes`,
      {
        headers: new HttpHeaders({
          Accept: 'application/json',
        })
      }
    );
  }

  getPaymentOptions(): Observable<HttpCollectionResponse<PaymentOptions>> {
    return this.http.get<HttpCollectionResponse<PaymentOptions>>(
      `${environment.baseUrl}/paymentoptions`,
      {
        headers: new HttpHeaders({
          Accept: 'application/json',
        })
      }
    );
  }

  getFacilities(): Observable<HttpCollectionResponse<any>> {
    return this.http.get<HttpCollectionResponse<any>>(`${environment.baseUrl}/facilities`, {
      headers: new HttpHeaders({
        Accept: 'application/json',
      })
    });
  }

  getDestinationPrice(destination: number): string {
    let price;
    switch (destination) {
      case 1:
        price = '2.45';
        break;
      case 2:
        price = '5.02';
        break;
      case 3:
        price = '8.43';
        break;
      case 4:
        price = '4.67';;
        break;
      case 5:
        price = '8.00';
        break;
      default:
        price = '0';
        break;
    }

    return price;
  }

  getProducts() {
    const products = [
      { product: 'Shipping', gross: 0, tax: '17.40', net: 0 },
      { product: 'Airport Fee', gross: 0, tax: '1.30', net: 0 },
      { product: 'Service', gross: 0, tax: '4.50', net: 0 }
    ];

    return products;
  }

  getToastrConfig(icon: string, status: string) {
    return  { 
      icon: icon, 
      iconPack: 'eva', 
      status: status,
      position: 'bottom-end',
      preventDuplicates: false
    };
  }

  getDateFormatted(date: any) {
    let d = new Date(date);
    return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
  }

  isSamePassword(c: AbstractControl): {[key: string]: boolean} | null {
    const password = c.get('newPassword');
    const confirmPassword = c.get('confirmPassword');
  
    if (password.value !== confirmPassword.value) {
      return { 'match': true };
    }
  
    return null;
  }

}
