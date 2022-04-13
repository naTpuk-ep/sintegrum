import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SwapiHttpService } from '../../layout/services/swapi-http/swapi-http.service';
import { ErrorHandlerService } from '../../error-handler/error-handler.service';
import { AuthService } from '../../auth/services/auth.service';
import {
  ICharacter,
  IEpisode,
  IFilmListItem,
  IGetFilmsResponse,
  IPlanet,
  IStarship,
} from './films-http.interfaces';

@Injectable()
export class FilmsHttpService extends SwapiHttpService {
  filmList$!: Observable<Readonly<IFilmListItem[]>>;
  constructor(
    protected httpClient: HttpClient,
    protected authService: AuthService,
    protected errorHandlerService: ErrorHandlerService,
    protected router: Router
  ) {
    super(httpClient, authService, errorHandlerService, router);
    this.filmList$ = this.getFilmList();
  }

  getEpisode(filmId: number) {
    return this.get<Readonly<IEpisode>>(`${this.baseUrl}/films/${filmId}`);
  }

  getPlanet(url: string) {
    return this.get<Readonly<IPlanet>>(url);
  }

  getStarship(url: string) {
    return this.get<Readonly<IStarship>>(url);
  }

  getCharacter(url: string) {
    return this.get<Readonly<ICharacter>>(url);
  }

  getFilmList(): Observable<Readonly<IFilmListItem[]>> {
    return this.get<IGetFilmsResponse>(`${this.baseUrl}/films`).pipe(
      map((response: IGetFilmsResponse) =>
        response.results.sort((a, b) => +a.episode_id - +b.episode_id)
      ),
      shareReplay()
    );
  }
}
