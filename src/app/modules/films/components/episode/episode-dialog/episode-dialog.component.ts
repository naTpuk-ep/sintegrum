import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-episode-dialog',
  templateUrl: './episode-dialog.component.html',
  styleUrls: ['./episode-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class EpisodeDialogComponent<T extends { name: T[keyof T] & string }> {
  viewData: { key: keyof T; value: T[keyof T] }[] = [];
  title: string;
  constructor(@Inject(MAT_DIALOG_DATA) private inputData: T, private datePipe: DatePipe) {
    this.title = this.inputData.name;
    this.prepareViewData();
  }

  formatCellValue(value: any) {
    if (typeof value === 'number') {
      return value;
    }
    if (this.isNumber(value)) {
      return +value;
    }
    if (!Number.isNaN(Date.parse(value))) {
      return this.datePipe.transform(value, 'dd.MM.YYYY');
    }
    return value;
  }

  isNumber(value: any) {
    return !Number.isNaN(+value);
  }

  private prepareViewData() {
    this.viewData = Object.entries(this.inputData)
      .map(([key, value]) => ({
        key: <keyof T>key.replace(/_/g, ' '),
        value,
      }))
      .filter(
        ({ key, value }) =>
          key !== 'url' &&
          !Array.isArray(value) &&
          key !== 'name' &&
          key !== 'created' &&
          key !== 'edited' &&
          key !== 'homeworld'
      );
  }
}
