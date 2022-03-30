import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';

export abstract class SwapiHttpService {
  protected _baseUrl = 'https://swapi.dev/api';
  protected constructor(
    protected _httpClient: HttpClient,
    protected _spinnerService: SpinnerService
  ) {}
  protected _get<T extends object>(url: string) {
    this._spinnerService.status$$.next(true);
    const httpGet$ = this._httpClient.get(url).pipe(
      tap(() => {
        this._spinnerService.status$$.next(false);
      })
    );
    return httpGet$ as Observable<T>;
  }
}
