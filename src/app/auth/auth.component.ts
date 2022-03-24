import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthService, TAuthFormValue } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit, AfterViewInit {
  @ViewChild('authForm') authForm!: ElementRef<HTMLFormElement>;
  authFormGroup!: FormGroup;
  private _fb = new FormBuilder();

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this._initAuthFormGroup();
  }
  ngAfterViewInit() {
    this.observeSubmit();
  }

  observeSubmit() {
    const submit$ = fromEvent(this.authForm.nativeElement, 'submit').pipe(
      map(() => this._authFormValue),
      filter(() => this.authFormGroup.valid)
    );
    this._authService.loginSubscribe(submit$);
  }

  get nameError() {
    return this.authFormGroup.controls.name?.errors?.minlength
      ? 'Enter at least 5 characters'
      : this.authFormGroup.controls.name?.errors?.required
      ? 'Enter name'
      : '';
  }

  get passwordError() {
    return this.authFormGroup.controls.password?.errors?.minlength
      ? 'Enter at least 5 characters'
      : this.authFormGroup.controls.password?.errors?.required
      ? 'Enter password'
      : '';
  }

  private get _authFormValue() {
    return this.authFormGroup.value as TAuthFormValue;
  }

  private _initAuthFormGroup() {
    this.authFormGroup = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
}
