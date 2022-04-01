import { HttpClient } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';
import { HttpErrorHandlerService } from './http-error-handler.service';

export class SwapiHttpService {
  protected _baseUrl = 'https://swapi.dev/ap';
  protected constructor(
    protected _httpClient: HttpClient,
    protected _spinnerService: SpinnerService,
    protected _httpErrorHandlerService: HttpErrorHandlerService
  ) {}
  protected _get<T>(url: string, spinner = true) {
    this._httpErrorHandlerService.error$$.next();
    this._spinnerService.status$$.next(spinner);
    return this._httpClient.get<T>(url).pipe(
      catchError((err: Error) => {
        this._httpErrorHandlerService.error$$.next(err);
        return EMPTY;
      }),
      tap({
        complete: () => {
          this._spinnerService.status$$.next(false);
        },
      })
    );
  }
}
