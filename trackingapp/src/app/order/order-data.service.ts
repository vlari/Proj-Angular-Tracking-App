import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpError } from '../shared/models/http-error.model';
import { Order } from '../shared/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {

  constructor(private http: HttpClient) { }

  getOrders(filter: any = {}): Observable<Order[] | HttpError> {
    let query = {};
    if (filter) {
      query = { ...filter };
      filter = '';

      for (const key in query) {
        if (query[key]) {
          filter += `&${key}=${query[key]}`;
        }
      }

      filter = `?${filter.slice(1)}`;
    }

    return this.http.get<Order[]>(
      `${environment.baseUrl}/orders${filter}`,
      {
        headers: new HttpHeaders({
          Accept: 'application/json',
        }),
        withCredentials: true
      }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  placeOrder(order): Observable<any | HttpError> {
    return this.http.post<any>(`${environment.baseUrl}/orders`, order, {
      headers: new HttpHeaders({
        ContentType: 'application/json',
      }),
      withCredentials: true
    }).pipe(
      catchError( err => this.handleError(err))
    );
  }

  private handleError(error: any): Observable<HttpError> {
    const { message, statusCode } = error.error;
    let responseError = new HttpError()
    responseError.errorCode = statusCode;
    responseError.message = message;

    return throwError(responseError);
  }

}
