import { HttpClient } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SpinnerService } from '../spinner/spinner.service';
import { HttpErrorHandlerService } from '../http-error-handler/http-error-handler.service';

export class SwapiHttpService {
  protected baseUrl = 'https://swapi.dev/api';
  protected constructor(
    protected httpClient: HttpClient,
    protected spinnerService: SpinnerService,
    protected httpErrorHandlerService: HttpErrorHandlerService
  ) {}
  protected _get<T>(url: string, spinner = true) {
    this.httpErrorHandlerService.error$$.next();
    this.spinnerService.status$$.next(spinner);
    return this.httpClient.get<T>(url).pipe(
      catchError((err: Error) => {
        this.httpErrorHandlerService.error$$.next(err);
        return EMPTY;
      }),
      tap({
        complete: () => {
          this.spinnerService.status$$.next(false);
        },
      })
    );
  }
}
