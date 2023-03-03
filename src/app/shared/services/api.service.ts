import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL_PARAMS = { api: 'api' };

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get(
    endpoint: any,
    queryParams?: { [key: string]: any },
    headers?: HttpHeaders
  ): Observable<any> {
    return this.httpClient.get<any>(
      [environment.api_url, URL_PARAMS.api, endpoint].join('/'),
      {
        params: queryParams,
        headers,
      }
    );
  }

  post(endpoint: any, body: any, headers?: HttpHeaders): Observable<any> {
    return this.httpClient.post<any>(
      [environment.api_url, URL_PARAMS.api, endpoint].join('/'),
      body,
      {
        headers,
      }
    );
  }

  put(endpoint: any, body: any, headers?: HttpHeaders): Observable<any> {
    return this.httpClient.put<any>(
      [environment.api_url, URL_PARAMS.api, endpoint].join('/'),
      body,
      {
        headers,
      }
    );
  }

  patch(endpoint: any, body: any, headers?: HttpHeaders): Observable<any> {
    return this.httpClient.patch<any>(
      [environment.api_url, URL_PARAMS.api, endpoint].join('/'),
      body,
      {
        headers,
      }
    );
  }

  delete(endpoint: any, headers?: HttpHeaders): Observable<any> {
    return this.httpClient.delete<any>(
      [environment.api_url, URL_PARAMS.api, endpoint].join('/'),
      {
        headers,
      }
    );
  }
}
