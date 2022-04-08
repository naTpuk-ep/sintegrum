import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SwapiHttpService } from '../../layout/services/swapi-http/swapi-http.service';
import { SpinnerService } from '../../layout/services/spinner/spinner.service';
import { ErrorHandlerService } from '../../error-handler/error-handler.service';

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

export interface IEpisode {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  created: string;
  edited: string;
  url: string;
}

export interface IPlanet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface IStarship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface ICharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

@Injectable()
export class FilmsHttpService extends SwapiHttpService {
  filmList$!: Observable<Readonly<IFilmListItem[]>>;
  constructor(
    protected httpClient: HttpClient,
    protected spinnerService: SpinnerService,
    protected errorHandlerService: ErrorHandlerService,
    protected router: Router
  ) {
    super(httpClient, spinnerService, errorHandlerService, router);
    this.filmList$ = this.getFilmList();
  }

  getEpisode(filmId: number) {
    return this.get<Readonly<IEpisode>>(`${this.baseUrl}/films/${filmId}`).pipe(shareReplay());
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
      map((response: IGetFilmsResponse) =>
        response.results.map(mapResult).sort((a, b) => a.episode_id - b.episode_id)
      ),
      shareReplay()
    );
  }
}
