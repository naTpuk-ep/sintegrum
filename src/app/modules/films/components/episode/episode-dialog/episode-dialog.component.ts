import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-episode-dialog',
  templateUrl: './episode-dialog.component.html',
  styleUrls: ['./episode-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class EpisodeDialogComponent<T extends { name: T[keyof T] & string } = any> {
  viewData: { key: keyof T; value: T[keyof T] }[] = [];
  title: string;
  constructor(@Inject(MAT_DIALOG_DATA) private inputData: T, private datePipe: DatePipe) {
    this.title = this.inputData.name;
    this.prepareViewData();
  }

  formatCellValue(value: string) {
    if (value.match(/^\d{4}-\d{2}-\d{2}/)) {
      return this.datePipe.transform(value, 'HH.MM.YYYY');
    }
    return value;
  }

  private prepareViewData() {
    this.viewData = Object.entries(this.inputData)
      .map(([key, value]) => ({
        key: <keyof T & string>key.replace(/_/g, ' '),
        value,
      }))
      .filter(({ key, value }) => !Array.isArray(value) && key !== 'name' && !value.match(/^http/));
  }
}
