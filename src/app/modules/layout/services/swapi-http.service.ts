import { HttpClient } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';

export class SwapiHttpService {
  protected _baseUrl = 'https://swapi.dev/api';
  protected constructor(
    protected _httpClient: HttpClient,
    protected _spinnerService: SpinnerService
  ) {}
  protected _get<T>(url: string, spinner = true) {
    this._spinnerService.status$$.next(spinner);
    return this._httpClient.get<T>(url).pipe(
      catchError(() => EMPTY),
      tap({
        complete: () => {
          this._spinnerService.status$$.next(false);
        },
      })
    );
  }
}
