import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilmsHttpService, IFilmListItem } from '../../services/films-http.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmListComponent implements OnInit {
  filmsList$?: Observable<Readonly<IFilmListItem[]>>;
  constructor(private _filmsHttpService: FilmsHttpService) {}

  ngOnInit(): void {
    this._getFilmList();
  }

  private _getFilmList() {
    this.filmsList$ = this._filmsHttpService.getFilmList();
  }
}
