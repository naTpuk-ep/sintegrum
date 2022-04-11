import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Directive({
  selector: '[appSpinner]',
})
export class SpinnerDirective {
  contentComponentRef!: ComponentRef<SpinnerComponent>;
  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @Input('appSpinner')
  set spinner(spinner: boolean) {
    this.viewContainerRef.clear();
    const contentComponent =
      this.componentFactoryResolver.resolveComponentFactory(SpinnerComponent);
    if (spinner) {
      this.contentComponentRef = this.viewContainerRef.createComponent(contentComponent);
    }
    if (this.contentComponentRef) {
      this.contentComponentRef.changeDetectorRef.detectChanges();
    }
  }
}
