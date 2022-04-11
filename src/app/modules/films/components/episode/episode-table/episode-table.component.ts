import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { IEpisodeTabData } from '../episode.component';
import { EpisodeDialogComponent } from '../episode-dialog/episode-dialog.component';

export interface ITableConfig<T extends object = any> {
  header: string;
  field: keyof T & string;
}

@Component({
  selector: 'app-episode-table',
  templateUrl: './episode-table.component.html',
  styleUrls: ['./episode-table.component.scss'],
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodeTableComponent {
  @Input() data!: IEpisodeTabData;
  constructor(private datePipe: DatePipe, public dialog: MatDialog) {}

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

  formatHeader(field: string) {
    return field.replace(/_/g, ' ');
  }

  tableRowClick(row: { name: string; [p: string]: any }) {
    this.dialog.open(EpisodeDialogComponent, {
      data: row,
      disableClose: true,
    });
  }
}
