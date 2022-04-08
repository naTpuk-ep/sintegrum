import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import {
  FilmsHttpService,
  ICharacter,
  IEpisode,
  IPlanet,
  IStarship,
} from '../../services/films-http.service';
import { mockEpisodeString, mockPlanets, peopleMock, starshipsMock } from './mock';
import { IEpisodeParams } from '../film-list/film-list.component';
import { ITableConfig } from './episode-table/episode-table.component';
import { tableColumns } from './episode-table.config';

export interface IGetDataFromEpisodeMethods {
  starships: (url: string) => Observable<Readonly<IStarship>>;
  planets: (url: string) => Observable<Readonly<IPlanet>>;
  characters: (url: string) => Observable<Readonly<ICharacter>>;
}

export type TTabKey = keyof IGetDataFromEpisodeMethods;

export interface IEpisodeTabData<T = any> {
  label: string;
  content$: Observable<T>;
  columns: string[];
}

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss'],
})
export class EpisodeComponent implements OnInit {
  episode$!: Observable<Readonly<IEpisode>>;
  episode!: Readonly<IEpisode>;
  getDataFromEpisodeMethods: IGetDataFromEpisodeMethods;
  episodeTabsData!: IEpisodeTabData<IPlanet[] | IStarship[] | ICharacter[]>[];
  selectedIndex: number = 0;
  constructor(public filmsHttpService: FilmsHttpService, private activatedRoute: ActivatedRoute) {
    this.getDataFromEpisodeMethods = {
      starships: this.filmsHttpService.getStarship.bind(this.filmsHttpService),
      planets: this.filmsHttpService.getPlanet.bind(this.filmsHttpService),
      characters: this.filmsHttpService.getCharacter.bind(this.filmsHttpService),
    };
  }

  ngOnInit(): void {
    this.getEpisodeData();
    this.getTabsData();
  }

  getEpisodeData() {
    this.episode$ = this.activatedRoute.queryParams.pipe(
      switchMap((params) => this.filmsHttpService.getEpisode((<IEpisodeParams>params).film)),
      shareReplay()
    );

    this.episode$.subscribe((episode) => {
      this.episode = episode;
    });
  }

  getEpisodeContent(key: TTabKey, method: IGetDataFromEpisodeMethods[TTabKey]) {
    return this.episode$.pipe(
      map((episode) => episode[<keyof IGetDataFromEpisodeMethods>key].map((url) => method(url))),
      switchMap((itemObservableArray) => <Observable<any[]>>forkJoin(itemObservableArray)),
      shareReplay()
    );
  }

  getTabsData() {
    this.episodeTabsData = Object.entries(this.getDataFromEpisodeMethods).map(([key, method]) => ({
      label: key,
      columns: tableColumns[<TTabKey>key],
      content$: this.getEpisodeContent(<TTabKey>key, method),
    }));
  }

  selectedIndexChange(index: number) {
    this.selectedIndex = index;
  }
}
