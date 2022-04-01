import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { fromEvent } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @ViewChild('logOutBtn') logOutBtnRef!: MatButton;
  userName!: string;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userName = this.authService.payload.name;
  }

  ngAfterViewInit() {
    this.observeLogout();
  }

  private observeLogout() {
    fromEvent(this.logOutBtnRef._getHostElement(), 'click').subscribe(() => {
      this.authService.logout();
    });
  }
}
