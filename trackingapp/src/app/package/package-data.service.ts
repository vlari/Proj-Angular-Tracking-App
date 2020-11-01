import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpError } from '../shared/models/http-error.model';
import { Package } from '../shared/models/package.model';

@Injectable({
  providedIn: 'root'
})
export class PackageDataService {

  constructor(private http: HttpClient) { }

  getPendingPackages(): Observable<Package[] | HttpError> {
    return this.http.get<Package[]>(
      `${environment.baseUrl}/packages`,
      {
        headers: new HttpHeaders({
          Accept: 'application/json',
        }),
        withCredentials: true
      }).pipe(
      catchError(err => this.handleError(err))
    );
  }
  
  getOrderPackages(): Observable<Package[] | HttpError> {
    return this.http.get<Package[]>(
      `${environment.baseUrl}/packages/pending`,
      {
        headers: new HttpHeaders({
          Accept: 'application/json',
        }),
        withCredentials: true
      }).pipe(
      catchError(err => this.handleError(err))
    );
  }
  
  getLocationName(coordinates: any): Observable<any | HttpError> {
    return this.http.get<any>(
      `${environment.mapLocationApi}/${coordinates.longitude},${coordinates.latitude}.json?access_token=${environment.mapKey}`,
      {
        headers: new HttpHeaders({
          Accept: 'application/json',
        })
      }).pipe(
      catchError(err => this.handleError(err))
    );
  }
  
  getPackages(filter: any = {}): Observable<Package[] | HttpError> {

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

    return this.http.get<Package[]>(
      `${environment.baseUrl}/packages${filter}`,
      {
        headers: new HttpHeaders({
          Accept: 'application/json',
        }),
        withCredentials: true
      }).pipe(
      catchError(err => this.handleError(err))
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
