import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { FilmsHttpService } from '../../services/films-http.service';
import { IEpisodeParams } from '../film-list/film-list.component';
import { tableColumns } from './episode-table.config';
import { ICharacter, IEpisode, IPlanet, IStarship } from '../../services/films-http.interfaces';

export interface IEpisodeGetDataMethods {
  starships: (url: string) => Observable<Readonly<IStarship>>;
  planets: (url: string) => Observable<Readonly<IPlanet>>;
  characters: (url: string) => Observable<Readonly<ICharacter>>;
}

export type TTabKey = keyof IEpisodeGetDataMethods;

export interface IEpisodeTabData<T = any> {
  label: string;
  content$: Observable<T[]>;
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
  episodeTabsGetDataMethods: IEpisodeGetDataMethods;
  episodeTabsData!: IEpisodeTabData<IPlanet[] | IStarship[] | ICharacter[]>[];
  selectedIndex: number = 0;
  spinner!: boolean;
  constructor(
    private filmsHttpService: FilmsHttpService,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {
    this.episodeTabsGetDataMethods = {
      starships: this.filmsHttpService.getStarship.bind(this.filmsHttpService),
      planets: this.filmsHttpService.getPlanet.bind(this.filmsHttpService),
      characters: this.filmsHttpService.getCharacter.bind(this.filmsHttpService),
    };
  }

  ngOnInit(): void {
    this.spinner = true;
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
      this.spinner = false;
      this.cdRef.detectChanges();
    });
  }

  private getEpisodeTabContent(key: TTabKey, method: IEpisodeGetDataMethods[TTabKey]) {
    return this.episode$.pipe(
      map((episode) => episode[<keyof IEpisodeGetDataMethods>key].map((url) => method(url))),
      switchMap((itemObservableArray) => <Observable<any[]>>forkJoin(itemObservableArray)),
      shareReplay()
    );
  }

  private getTabsData() {
    this.episodeTabsData = Object.entries(this.episodeTabsGetDataMethods).map(([key, method]) => ({
      label: key,
      columns: tableColumns[<TTabKey>key],
      content$: this.getEpisodeTabContent(<TTabKey>key, method),
    }));
  }
}
