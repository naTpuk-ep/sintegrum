import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmListComponent } from './components/film-list/film-list.component';
import { FilmsHttpService } from './services/films-http.service';
import { FilmsRoutingModule } from './films-routing.module';

@NgModule({
  declarations: [FilmListComponent],
  imports: [CommonModule, FilmsRoutingModule],
  providers: [FilmsHttpService],
})
export class FilmsModule {}
