import { Component, OnInit } from '@angular/core';
import { SwapiHttpService } from '../shared/swapi-http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private _swapiHttpService: SwapiHttpService) {}

  ngOnInit(): void {
    this._swapiHttpService.getFilms().subscribe((res) => {
      console.log(res);
    });
  }
}
