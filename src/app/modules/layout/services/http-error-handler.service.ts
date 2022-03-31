import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class HttpErrorHandlerService {
  error$$ = new ReplaySubject<Error>();
}
