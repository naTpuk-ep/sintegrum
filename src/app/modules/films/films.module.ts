import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FilmListComponent } from './components/film-list/film-list.component';
import { FilmsHttpService } from './services/films-http.service';
import { FilmsRoutingModule } from './films-routing.module';
import { FilmAboutComponent } from './components/film-about/film-about.component';

@NgModule({
  declarations: [FilmListComponent, FilmAboutComponent],
  imports: [CommonModule, FilmsRoutingModule, MatCardModule, MatButtonModule],
  providers: [FilmsHttpService],
})
export class FilmsModule {}
