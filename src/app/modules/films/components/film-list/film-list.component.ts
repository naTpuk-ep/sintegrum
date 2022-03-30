import { Component, OnInit } from '@angular/core';
import { FilmsHttpService } from '../../services/films-http.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
})
export class FilmListComponent implements OnInit {
  constructor(private _filmsHttpService: FilmsHttpService) {}

  ngOnInit(): void {
    this._getFilmList();
  }

  private _getFilmList() {
    this._filmsHttpService.getFilmList().subscribe((res) => {
      console.log(res);
    });
  }
}
