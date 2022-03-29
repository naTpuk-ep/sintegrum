import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwapiHttpService } from '../shared/swapi-http.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private _swapiHttpService: SwapiHttpService, private _router: Router) {
    // this._router.navigate(['films/list']);
  }

  ngOnInit(): void {}
}
