import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Key } from '../key/key'

import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class IrisKeyService {

  constructor(
    private http: HttpClient
    ) { }

  import(file): any {

    const headers = new HttpHeaders()

    let url = ''

    let base = environment.BASE_PATH
    let path = '/api/keyuploader/key'

    url = base + path

    if (!environment.production) {
      url = 'http://localhost:52773/api/keyuploader/key'
    }
  
    return this.http.post(base+path, file)
  }

  info(): Observable<Key> {

    const headers = new HttpHeaders()

    let url = ''

    let base = environment.BASE_PATH
    let path = '/api/keyuploader/key'

    url = base + path

    if (!environment.production) {
      url = 'http://localhost:52773/api/keyuploader/key'
    }  

    return this.http.get<Key>(url)

  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
