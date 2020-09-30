import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpError } from '../shared/models/http-error.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getDocumentTypes(): Observable<DocumentType[]> {
    return this.http.get<DocumentType[]>(
      `${environment.baseUrl}/documenttypes`,
      {
        headers: new HttpHeaders({
          Accept: 'application/json',
        })
      }
    );
  }

  getPaymentOptions(): Observable<PaymentOptions[]> {
    return this.http.get<PaymentOptions[]>(
      `${environment.baseUrl}/paymentoptions`,
      {
        headers: new HttpHeaders({
          Accept: 'application/json',
        })
      }
    );
  }

  getFacilities(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/facilities`, {
      headers: new HttpHeaders({
        Accept: 'application/json',
      })
    });
  }

  signUp(user: any): Observable<any | HttpError>{
    return this.http.post<any>(`${environment.baseUrl}/signup`, user, {
      headers: new HttpHeaders({
        ContentType: 'application/json',
      })
    }).pipe(
      catchError( err => this.handleError(err))
    );
  }

  login(email: string, password: string): Observable<any | HttpError> {
    return this.http.post<any>(`${environment.baseUrl}/signin`, { email, password }, {
      headers: new HttpHeaders({
        ContentType: 'application/json',
      })
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
