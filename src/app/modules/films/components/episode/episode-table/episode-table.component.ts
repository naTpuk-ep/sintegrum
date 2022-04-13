import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
export class EpisodeTableComponent implements OnInit {
  @Input() data!: IEpisodeTabData;
  @ViewChild(MatSort) tableSort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  spinner!: boolean;
  constructor(
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.spinner = true;
    this.data.content$.subscribe((content) => {
      this.spinner = false;
      this.dataSource = new MatTableDataSource(content);
      this.dataSource.sort = this.tableSort;
      this.cdRef.detectChanges();
    });
  }

  formatCellValue(value: string) {
    if (value.match(/^\d{4}-\d{2}-\d{2}/)) {
      return this.datePipe.transform(value, 'HH.MM.YYYY');
    }
    return value;
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
