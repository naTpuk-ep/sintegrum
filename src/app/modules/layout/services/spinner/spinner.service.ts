import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class SpinnerService {
  status$$ = new Subject<boolean>();
}
