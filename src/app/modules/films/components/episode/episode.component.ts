import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import {
  FilmsHttpService,
  ICharacter,
  IEpisode,
  IPlanet,
  IStarship,
} from '../../services/films-http.service';
import { IEpisodeParams } from '../film-list/film-list.component';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EpisodeComponent implements OnInit {
  episode$!: Observable<Readonly<IEpisode>>;
  episode!: Readonly<IEpisode>;
  getEpisodeSubDataMethods: IGetDataFromEpisodeMethods;
  episodeTabsData!: IEpisodeTabData<IPlanet[] | IStarship[] | ICharacter[]>[];
  selectedIndex: number = 0;
  constructor(
    public filmsHttpService: FilmsHttpService,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {
    this.getEpisodeSubDataMethods = {
      starships: this.filmsHttpService.getStarship.bind(this.filmsHttpService),
      planets: this.filmsHttpService.getPlanet.bind(this.filmsHttpService),
      characters: this.filmsHttpService.getCharacter.bind(this.filmsHttpService),
    };
  }

  ngOnInit(): void {
    this.getEpisodeData();
    this.getTabsData();
  }

  selectedIndexChange(index: number) {
    this.selectedIndex = index;
  }

  private getEpisodeData() {
    this.episode$ = this.activatedRoute.queryParams.pipe(
      switchMap((params) => this.filmsHttpService.getEpisode((<IEpisodeParams>params).film)),
      shareReplay()
    );
    this.episode$.subscribe((episode) => {
      this.episode = episode;
      this.cdRef.detectChanges();
    });
  }

  private getEpisodeContent(key: TTabKey, method: IGetDataFromEpisodeMethods[TTabKey]) {
    return this.episode$.pipe(
      map((episode) => episode[<keyof IGetDataFromEpisodeMethods>key].map((url) => method(url))),
      switchMap((itemObservableArray) => <Observable<any[]>>forkJoin(itemObservableArray)),
      shareReplay()
    );
  }

  private getTabsData() {
    this.episodeTabsData = Object.entries(this.getEpisodeSubDataMethods).map(([key, method]) => ({
      label: key,
      columns: tableColumns[<TTabKey>key],
      content$: this.getEpisodeContent(<TTabKey>key, method),
    }));
  }
}
