import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class SpinnerService {
  status$$ = new ReplaySubject<boolean>();
}
