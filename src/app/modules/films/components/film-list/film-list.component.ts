import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { FilmsHttpService, IFilmListItem } from '../../services/films-http.service';
import { AuthService, TUserPermissions } from '../../../auth/services/auth.service';

export interface IEpisodeParams extends Params {
  film: number;
}

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmListComponent implements OnInit {
  filmsList$!: Observable<Readonly<IFilmListItem[]>>;
  routerLink = '/content/films/episode';
  spinner!: boolean;
  userActionPermissions?: TUserPermissions[];
  constructor(
    private filmsHttpService: FilmsHttpService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.spinner = true;
    this.getFilmList();
    this.authService.payload$.subscribe((payload) => {
      this.userActionPermissions = payload?.permissions?.filter((p) => p !== 'read');
      this.cdRef.detectChanges();
    });
  }

  getEpisodeQueryParams(filmListItem: IFilmListItem): IEpisodeParams {
    const splitUrl = filmListItem.url.split('/');
    const film = +splitUrl[splitUrl.length - 2];
    return { film };
  }

  private getFilmList() {
    this.filmsList$ = this.filmsHttpService.filmList$;
    this.filmsList$.subscribe(() => {
      this.spinner = false;
    });
  }
}
