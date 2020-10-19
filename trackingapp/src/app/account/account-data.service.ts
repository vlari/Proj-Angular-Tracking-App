import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpError } from '../shared/models/http-error.model';

@Injectable({
  providedIn: 'root'
})
export class AccountDataService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  patchUser(user): Observable<any | HttpError> {
    return this.http.put<any>(`${environment.baseUrl}/accounts`, user, {
      headers: new HttpHeaders({
        ContentType: 'application/json',
      }),
      withCredentials: true
    }).pipe(
      catchError( err => this.handleError(err))
    );
  }
  
  patchPassword(password: string, newPassword: string): Observable<any | HttpError> {
    return this.http.post<any>(`${environment.baseUrl}/accounts/password`, { password, newPassword }, {
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
