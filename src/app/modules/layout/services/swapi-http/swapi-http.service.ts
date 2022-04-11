import { HttpClient } from '@angular/common/http';
import { defer, EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../../error-handler/error-handler.service';

export class SwapiHttpService {
  protected baseUrl = 'https://swapi.dev/api';
  protected constructor(
    protected httpClient: HttpClient,
    protected errorHandlerService: ErrorHandlerService,
    protected router: Router
  ) {}
  protected get<T>(url: string, spinner = true) {
    return defer(() => {
      return this.httpClient.get<T>(url).pipe(
        catchError((err: Error) => {
          this.errorHandlerService.error$$.next(err);
          this.router.navigate(['']);
          return EMPTY;
        })
      );
    });
  }
}
