import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class HttpErrorHandlerService {
  error$$ = new Subject<Error>();
}
