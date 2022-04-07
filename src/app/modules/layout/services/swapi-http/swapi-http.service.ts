import { HttpClient } from '@angular/common/http';
import { defer, EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SpinnerService } from '../spinner/spinner.service';
import { ErrorHandlerService } from '../../../error-handler/error-handler.service';

export class SwapiHttpService {
  protected baseUrl = 'https://swapi.dev/api';
  protected constructor(
    protected httpClient: HttpClient,
    protected spinnerService: SpinnerService,
    protected errorHandlerService: ErrorHandlerService,
    protected router: Router
  ) {}
  protected get<T>(url: string, spinner = true) {
    return defer(() => {
      this.spinnerService.status$$.next(spinner);
      return this.httpClient.get<T>(url).pipe(
        catchError((err: Error) => {
          this.errorHandlerService.error$$.next(err);
          this.router.navigate(['']);
          return EMPTY;
        }),
        finalize(() => {
          this.spinnerService.status$$.next(false);
        })
      );
    });
  }
}
