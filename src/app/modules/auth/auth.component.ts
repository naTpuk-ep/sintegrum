import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { appUserRoles, AuthService, IUserRole } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  userRoles: IUserRole[] = appUserRoles;
  authFormGroup!: FormGroup;
  private fb = new FormBuilder();
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthorized()) {
      this.router.navigate(['']);
    }
    this.initAuthFormGroup();
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

  private observeLoginSubmit() {
    const loginFormValue$ = this.authFormGroup.valueChanges.pipe(
      filter(() => this.authFormGroup.valid)
    );
    this.authService.login(loginFormValue$);
  }

  private initAuthFormGroup() {
    this.authFormGroup = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(5)]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        role: [this.userRoles[0], [Validators.required]],
      },
      {
        updateOn: 'submit',
      }
    );
  }
}
