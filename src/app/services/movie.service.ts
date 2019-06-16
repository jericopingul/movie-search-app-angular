import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const apikey = '83513884';
const baseUrl = 'https://omdbapi.com/';
const baseParams = new HttpParams().set('apikey', apikey);

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) {}

  search(name: string): Observable<any> {
    const params = baseParams.set('s', name).set('type', 'movie');
    return this.http
      .get<any>(baseUrl, { params })
      .pipe(catchError(err => throwError('something happened')));
  }

  getById(id: string): Observable<any> {
    const params = baseParams.set('i', id).set('plot', 'short');
    return this.http.get<any>(baseUrl, { params });
  }
}
