import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-episode-table',
  templateUrl: './episode-table.component.html',
  styleUrls: ['./episode-table.component.scss'],
})
export class EpisodeTableComponent<T> implements OnInit {
  @Input() data$?: Observable<T[]>;
  constructor() {}

  ngOnInit(): void {}
}
