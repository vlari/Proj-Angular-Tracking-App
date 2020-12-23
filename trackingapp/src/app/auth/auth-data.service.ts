import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpError } from '../shared/models/http-error.model';
import { catchError } from 'rxjs/operators';
import { HttpCollectionResponse } from '../shared/models/http-collection-response.model';
import { User } from '../shared/models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { AuthState } from './state/auth.reducer';
import * as AuthActions from './state/auth.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private store: Store<AuthState>
  ) {}

  getUser(): Observable<User[] | HttpError> {
    return this.http
      .get<User[]>(`${environment.baseUrl}/accounts`, {
        headers: new HttpHeaders({
          Accept: 'application/json',
        }),
        withCredentials: true,
      })
      .pipe(catchError((err) => this.handleError(err)));
  }

  login(email: string, password: string): Observable<any | HttpError> {
    return this.http
      .post<any>(
        `${environment.baseUrl}/signin`,
        { email, password },
        {
          headers: new HttpHeaders({
            ContentType: 'application/json',
          }),
        }
      )
      .pipe(catchError((err) => this.handleError(err)));
  }

  signUp(user: any): Observable<any | HttpError> {
    return this.http
      .post<any>(`${environment.baseUrl}/signup`, user, {
        headers: new HttpHeaders({
          ContentType: 'application/json',
        }),
      })
      .pipe(catchError((err) => this.handleError(err)));
  }
  
  sendEmail(email: string): Observable<any | HttpError> {
    return this.http
      .post<any>(`${environment.baseUrl}/passwordforgot`, { email }, {
        headers: new HttpHeaders({
          ContentType: 'application/json',
        }),
      })
      .pipe(catchError((err) => this.handleError(err)));
  }
  
  resetPassword(userDetail: any): Observable<any | HttpError> {
    return this.http
      .post<any>(`${environment.baseUrl}/passwordreset`, userDetail, {
        headers: new HttpHeaders({
          ContentType: 'application/json',
        }),
      })
      .pipe(catchError((err) => this.handleError(err)));
  }

  signOut() {
    this.cookieService.delete('userToken', '/');
    this.store.dispatch(AuthActions.deleteSession());
  }

  private handleError(error: any): Observable<HttpError> {
    const { message, statusCode } = error.error;
    let responseError = new HttpError();
    responseError.errorCode = statusCode;
    responseError.message = message;

    return throwError(responseError);
  }
}
