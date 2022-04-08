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
import { FilmsHttpService, IEpisode, IPlanet } from '../../services/films-http.service';
import { mockEpisodeString, mockPlanets } from './mock';
import { IEpisodeParams } from '../film-list/film-list.component';

interface IEpisodeTab<T = any> {
  label: string;
  content$?: Observable<T>;
}

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss'],
})
export class EpisodeComponent implements OnInit, AfterViewInit {
  episode$!: Observable<Readonly<IEpisode>>;
  episode!: Readonly<IEpisode>;
  planets$!: Observable<Readonly<IPlanet>[]>;
  episodeTabs!: IEpisodeTab<IPlanet[]>[];

  selectedIndex: number = 0;
  constructor(
    public filmsHttpService: FilmsHttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEpisodeData();
  }

  ngAfterViewInit() {}

  getEpisodeData() {
    this.episode$ = of(JSON.parse(mockEpisodeString) as IEpisode);

    //   this.activatedRoute.queryParams.pipe(
    //   switchMap((params) => this.filmsHttpService.getEpisode((<IEpisodeParams>params).film))
    // );
    this.episode$.subscribe((episode) => {
      this.episode = episode;
    });

    const planets$1 = of(JSON.parse(mockPlanets)).pipe(
      tap(() => {
        console.log('planet 1');
      })
    );
    const planets$2 = of(JSON.parse(mockPlanets)).pipe(
      tap(() => {
        console.log('planet 2');
      })
    );

    this.episodeTabs = [
      {
        label: 'planets1',
        content$: planets$1,
      },
      {
        label: 'planets1',
        content$: planets$2,
      },
    ];

    // this.episodeTabs$ = of([{ label: 'Label', content:  }, JSON.parse(mockPlanets)]);

    //   this.episode$.pipe(
    //   map((episode) => episode.planets.map((url) => this.filmsHttpService.getPlanet(url))),
    //   switchMap((planets$: Observable<Readonly<IPlanet>>[]) => forkJoin(planets$))
    // );
  }

  selectedIndexChange(index: number) {
    this.selectedIndex = index;
  }
}
