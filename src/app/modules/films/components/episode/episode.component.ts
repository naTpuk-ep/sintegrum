import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { FilmsHttpService, IEpisode, IPlanet } from '../../services/films-http.service';
import { mockEpisodeString } from './episode.mock';

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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private filmsHttpService: FilmsHttpService
  ) {}

  ngOnInit(): void {
    this.getEpisodeInfo();
  }

  getEpisodeInfo() {
    this.episode$ = of(<IEpisode>JSON.parse(mockEpisodeString));
    this.planets$ = this.episode$.pipe(
      map((episode) => episode.planets.map((url) => this.filmsHttpService.getPlanet(url))),
      switchMap((planets$: Observable<Readonly<IPlanet>>[]) => forkJoin(planets$))
    );
  }
}
