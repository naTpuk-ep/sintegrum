import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IEpisodeTabData } from '../episode.component';

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
  constructor(private datePipe: DatePipe) {}

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
}
