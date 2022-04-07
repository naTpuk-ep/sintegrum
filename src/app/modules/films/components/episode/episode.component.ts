import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FilmsHttpService, IEpisodeInfo } from '../../services/films-http.service';
import { IEpisodeParams } from '../film-list/film-list.component';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss'],
})
export class EpisodeComponent implements OnInit {
  episode$?: Observable<Readonly<IEpisodeInfo>>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private filmsHttpService: FilmsHttpService
  ) {}

  ngOnInit(): void {
    this.getEpisodeInfo();
  }

  getEpisodeInfo() {
    const params$ = this.activatedRoute.queryParams as Observable<IEpisodeParams>;
    this.episode$ = params$.pipe(
      switchMap((params) => this.filmsHttpService.getEpisodeInfo(params.film))
    );
    this.episode$.subscribe((res) => {
      console.log(res);
    });
  }
}
