import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { fromEvent } from 'rxjs';
import { AuthService } from '../../../shared/sevices/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @ViewChild('logOutBtn') logOutBtnRef!: MatButton;
  userName!: string;
  constructor(private _authService: AuthService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.userName = this._authService.payload.name;
  }

  ngAfterViewInit() {
    this._observeLogout();
  }

  private _observeLogout() {
    const logout$ = fromEvent(this.logOutBtnRef._getHostElement(), 'click');
    this._authService.logout(logout$);
  }
}
