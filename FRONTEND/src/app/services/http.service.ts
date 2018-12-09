import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
//      'Authorization': 'Basic YWRtaW46YWRtaW4=', // admin/password
    })
  };
  private URL = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  public get<T>(route): Observable<T> {
    return this.httpClient.get(this.URL + route, this.options) as Observable<T>;
  }

  public post<T>(route, body): Observable<T> {
    return this.httpClient.post(this.URL + route, body, this.options) as Observable<T>;
  }

  public put<T>(route, body): Observable<T> {
    return this.httpClient.put(this.URL + route, body, this.options) as Observable<T>;
  }

  public patch<T>(route, body): Observable<T> {
    return this.httpClient.patch(this.URL + route, body, this.options) as Observable<T>;
  }

  public delete<T>(route): Observable<T> {
    return this.httpClient.delete(this.URL + route, this.options) as Observable<T>;
  }
}
