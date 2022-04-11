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
import { MatTabsModule } from '@angular/material/tabs';
import { EpisodeDialogComponent } from './components/episode/episode-dialog/episode-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [FilmListComponent, EpisodeComponent, EpisodeTableComponent, EpisodeDialogComponent],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,
    MatSortModule,
  ],
  providers: [FilmsHttpService],
})
export class FilmsModule {}
