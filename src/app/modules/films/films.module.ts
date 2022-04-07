import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FilmListComponent } from './components/film-list/film-list.component';
import { FilmsHttpService } from './services/films-http.service';
import { FilmsRoutingModule } from './films-routing.module';
import { EpisodeComponent } from './components/episode/episode.component';
import { MatTableModule } from '@angular/material/table';
import { EpisodeTableComponent } from './components/episode/episode-table/episode-table.component';

@NgModule({
  declarations: [FilmListComponent, EpisodeComponent, EpisodeTableComponent],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
  ],
  providers: [FilmsHttpService],
})
export class FilmsModule {}
