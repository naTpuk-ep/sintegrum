import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SwapiHttpService } from '../../layout/services/swapi-http.service';

export type TFilmListItem = Readonly<{
  episode_id: number;
  title: string;
  opening_crawl: string;
  producer: string;
  release_date: string;
  url: string;
}>;

export type TGetFilmsResponse = {
  results: TFilmListItem[];
};

@Injectable()
export class FilmsHttpService extends SwapiHttpService {
  constructor(protected _httpClient: HttpClient) {
    super(_httpClient);
  }
  getFilmList(): Observable<TFilmListItem[]> {
    return this._get<TGetFilmsResponse>(`${this._baseUrl}/films`).pipe(
      map((response) =>
        response.results.map(
          ({ url, opening_crawl, release_date, producer, title, episode_id }) => ({
            url,
            opening_crawl,
            release_date,
            producer,
            title,
            episode_id,
          })
        )
      )
    );
  }
}
