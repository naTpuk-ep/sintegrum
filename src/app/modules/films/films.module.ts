import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { FilmListComponent } from './components/film-list/film-list.component';
import { FilmsHttpService } from './services/films-http.service';
import { FilmsRoutingModule } from './films-routing.module';
import { EpisodeComponent } from './components/episode/episode.component';
import { EpisodeTableComponent } from './components/episode/episode-table/episode-table.component';
import { EpisodeDialogComponent } from './components/episode/episode-dialog/episode-dialog.component';
import { SpinnerDirective } from '../layout/directives/spinner.directive';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    FilmListComponent,
    EpisodeComponent,
    EpisodeTableComponent,
    EpisodeDialogComponent,
    SpinnerDirective,
  ],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,
    MatSortModule,
    MatIconModule,
  ],
  providers: [FilmsHttpService],
})
export class FilmsModule {}
