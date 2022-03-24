import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, TAuthFormValue } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authFormGroup!: FormGroup;
  private fb = new FormBuilder();
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.initAuthFormGroup();
  }

  authSubmit() {
    if (this.authFormGroup.valid) {
      this.authService.login(this.authFormValue);
    }
  }

  private get authFormValue() {
    return this.authFormGroup.value as TAuthFormValue;
  }

  private initAuthFormGroup() {
    this.authFormGroup = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
