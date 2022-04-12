import { HttpClient } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../../error-handler/error-handler.service';
import { AuthService } from '../../../auth/services/auth.service';

export class SwapiHttpService {
  protected baseUrl = 'https://swapi.dev/api';
  protected constructor(
    protected httpClient: HttpClient,
    protected authService: AuthService,
    protected errorHandlerService: ErrorHandlerService,
    protected router: Router
  ) {}
  protected get<T>(url: string, spinner = true) {
    return this.httpClient.get<T>(url).pipe(
      takeUntil(this.authService.logoutTrigger$),
      catchError((err: Error) => {
        this.errorHandlerService.error$$.next(err);
        this.router.navigate(['']);
        return EMPTY;
      })
    );
  }
}
