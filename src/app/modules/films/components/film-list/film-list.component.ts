import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { FilmsHttpService, IFilmListItem } from '../../services/films-http.service';

export interface IEpisodeParams extends Params {
  episode: number;
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
  constructor(private filmsHttpService: FilmsHttpService) {}

  ngOnInit(): void {
    this.getFilmList();
  }

  getEpisodeQueryParams(filmListItem: IFilmListItem): IEpisodeParams {
    const splitUrl = filmListItem.url.split('/');
    const episode = +splitUrl[splitUrl.length - 2];
    return {
      episode,
    };
  }

  private getFilmList() {
    this.filmsList$ = this.filmsHttpService.filmList$;
  }
}
