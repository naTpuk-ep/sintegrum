import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SwapiHttpService } from '../../layout/services/swapi-http/swapi-http.service';
import { SpinnerService } from '../../layout/services/spinner/spinner.service';
import { HttpErrorHandlerService } from '../../layout/services/http-error-handler/http-error-handler.service';

export interface IFilmListItem {
  episode_id: number;
  title: string;
  opening_crawl: string;
  producer: string;
  release_date: string;
  url: string;
}

export interface IFilmListItemResults extends IFilmListItem {
  [p: string]: any;
}

export interface IGetFilmsResponse {
  results: Readonly<IFilmListItemResults>[];
}

@Injectable()
export class FilmsHttpService extends SwapiHttpService {
  filmsList$: Observable<Readonly<IFilmListItem[]>>;
  constructor(
    protected httpClient: HttpClient,
    protected spinnerService: SpinnerService,
    protected httpErrorHandlerService: HttpErrorHandlerService
  ) {
    super(httpClient, spinnerService, httpErrorHandlerService);
    this.filmsList$ = this.getFilmList();
  }
  getFilmList(): Observable<Readonly<IFilmListItem[]>> {
    const mapResult = ({
      url,
      opening_crawl,
      release_date,
      producer,
      title,
      episode_id,
    }: Readonly<IFilmListItemResults>): Readonly<IFilmListItem> => ({
      url,
      opening_crawl,
      release_date,
      producer,
      title,
      episode_id,
    });

    return this.get<IGetFilmsResponse>(`${this.baseUrl}/films`).pipe(
      map((response: IGetFilmsResponse) => response.results.map(mapResult)),
      shareReplay()
    );
  }
}
