import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type TFilmListItem = Readonly<{
  episode_id: number;
  title: string;
  opening_crawl: string;
  producer: string;
  release_date: string;
  url: string;
}>;

export type TSwapiResponse<T> = {
  results: T;
};

@Injectable()
export class SwapiHttpService {
  private _baseUrl = 'https://swapi.dev/api/';
  constructor(private _http: HttpClient) {}

  getFilms(): Observable<TFilmListItem[]> {
    return this._get<TSwapiResponse<TFilmListItem[]>>('films').pipe(
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

  private _get<T>(url: string) {
    return this._http.get(this._baseUrl + url) as Observable<T>;
  }
}
