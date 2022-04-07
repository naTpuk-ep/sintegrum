import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { FilmsHttpService, IEpisode, IPlanet } from '../../services/films-http.service';
import { mockEpisodeString } from './episode.mock';
import { IEpisodeParams } from '../film-list/film-list.component';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss'],
})
export class EpisodeComponent implements OnInit {
  episode$?: Observable<Readonly<IEpisode>>;
  episode?: Readonly<IEpisode>;
  planets$?: Observable<Readonly<IPlanet>[]>;
  constructor(
    public filmsHttpService: FilmsHttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEpisodeInfo();
  }

  getEpisodeInfo() {
    this.episode$ = this.activatedRoute.queryParams.pipe(
      switchMap((params) => this.filmsHttpService.getEpisode((<IEpisodeParams>params).film))
    );
    this.episode$.subscribe((episode) => {
      this.episode = episode;
    });
    this.planets$ = this.episode$.pipe(
      map((episode) => episode.planets.map((url) => this.filmsHttpService.getPlanet(url))),
      switchMap((planets$: Observable<Readonly<IPlanet>>[]) => forkJoin(planets$))
    );
  }
}
