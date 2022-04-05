import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmAboutComponent } from './film-about.component';

describe('FilmAboutComponent', () => {
  let component: FilmAboutComponent;
  let fixture: ComponentFixture<FilmAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
