import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { SideNavService } from './services/sidenav/side-nav.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatSidenav) matSideNav!: MatSidenav;
  private subscriptions: Subscription[] = [];
  constructor(
    public sideNavService: SideNavService,
    private breakpointObserver: BreakpointObserver,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.subscriptions.push(
      this.matSideNav._animationEnd.subscribe(() => {
        window.dispatchEvent(new Event('resize'));
      }),
      this.breakpointObserver.observe(['(max-width: 1199px)']).subscribe((value) => {
        if (value.matches) {
          this.matSideNav.mode = 'over';
        } else {
          this.matSideNav.mode = 'side';
        }
        this.cdRef.detectChanges();
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
