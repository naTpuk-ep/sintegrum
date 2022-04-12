import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { appUserRoles, AuthService, IUserRole, TAuthFormValue } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit, AfterViewInit {
  @ViewChild('authForm') authFormRef!: ElementRef<HTMLFormElement>;
  userRoles: IUserRole[] = appUserRoles;
  authFormGroup!: FormGroup;
  private fb = new FormBuilder();
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.resetLoginStatus();
    this.initAuthFormGroup();
  }
  ngAfterViewInit() {
    this.observeLoginSubmit();
  }

  get nameError(): string {
    return this.authFormGroup.controls.name?.errors?.minlength
      ? 'Enter at least 5 characters'
      : this.authFormGroup.controls.name?.errors?.required
      ? 'Enter name'
      : '';
  }

  get passwordError(): string {
    return this.authFormGroup.controls.password?.errors?.minlength
      ? 'Enter at least 5 characters'
      : this.authFormGroup.controls.password?.errors?.required
      ? 'Enter password'
      : '';
  }

  selectCompareFunction(a: IUserRole, b: IUserRole) {
    return a.role === b.role;
  }

  private observeLoginSubmit() {
    const loginSubmit$ = fromEvent(this.authFormRef.nativeElement, 'submit').pipe(
      tap(() => {
        console.log(this.authFormValue);
      }),
      filter(() => this.authFormGroup.valid),
      map(() => this.authFormValue)
    );
    this.authService.loginSubscribe(loginSubmit$);
  }

  private get authFormValue() {
    return this.authFormGroup.value as TAuthFormValue;
  }

  private initAuthFormGroup() {
    this.authFormGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      role: [this.userRoles[0], [Validators.required]],
    });
  }
}
