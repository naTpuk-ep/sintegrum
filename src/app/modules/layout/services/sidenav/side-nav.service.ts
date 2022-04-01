import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';

@Injectable()
export class SideNavService {
  toggleInitState = true;
  private _toggler$!: Observable<boolean>;

  set toggler$(toggler$: Observable<boolean>) {
    this._toggler$ = toggler$?.pipe(
      scan((toggler) => !toggler, this.toggleInitState),
      startWith(this.toggleInitState)
    );
  }
  get toggler$() {
    return this._toggler$;
  }
}
