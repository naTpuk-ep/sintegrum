import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SwapiHttpService {
  loading$$ = new BehaviorSubject<boolean>(false);
  protected _baseUrl = 'https://swapi.dev/api';
  constructor(protected _httpClient: HttpClient) {}
  protected _get<T>(url: string) {
    this.loading$$.next(true);
    const httpGet$ = this._httpClient.get(url) as Observable<T>;
    httpGet$.subscribe(() => {
      this.loading$$.next(false);
    });
    return httpGet$;
  }
}
