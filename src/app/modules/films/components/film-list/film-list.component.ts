import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { FilmsHttpService, IFilmListItem } from '../../services/films-http.service';

export interface IEpisodeParams extends Params {
  film: number;
}

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmListComponent implements OnInit {
  filmsList$!: Observable<Readonly<IFilmListItem[]>>;
  routerLink = '/content/films/episode';
  spinner!: boolean;
  constructor(private filmsHttpService: FilmsHttpService) {}

  ngOnInit(): void {
    this.spinner = true;
    this.getFilmList();
  }

  getEpisodeQueryParams(filmListItem: IFilmListItem): IEpisodeParams {
    const splitUrl = filmListItem.url.split('/');
    const film = +splitUrl[splitUrl.length - 2];
    return { film };
  }

  private getFilmList() {
    this.filmsList$ = this.filmsHttpService.filmList$;
    this.filmsList$.subscribe(() => {
      this.spinner = false;
    });
  }
}
