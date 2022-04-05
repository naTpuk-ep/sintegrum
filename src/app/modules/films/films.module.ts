import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FilmListComponent } from './components/film-list/film-list.component';
import { FilmsHttpService } from './services/films-http.service';
import { FilmsRoutingModule } from './films-routing.module';
import { EpisodeComponent } from './components/episode/episode.component';

@NgModule({
  declarations: [FilmListComponent, EpisodeComponent],
  imports: [CommonModule, FilmsRoutingModule, MatCardModule, MatButtonModule],
  providers: [FilmsHttpService],
})
export class FilmsModule {}
