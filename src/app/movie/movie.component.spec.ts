import { DebugElement } from '@angular/core';
import { Movie } from '../models/movie';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { MovieComponent } from './movie.component';
import { MatDialog, MatDialogModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { MovieService } from '../services/movie.service';

fdescribe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  const mockMovie: Movie = {
    Title: 'The Graduate',
    Year: '1967',
    imdbID: 'tt0061722',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMTQ0ODc4MDk4Nl5BMl5BanBnXkFtZTcwMTEzNzgzNA@@._V1_SX300.jpg'
  };
  const mockMovieDetails = {
    Title: 'The Graduate',
    Plot:
      'A disillusioned college graduate finds himself torn between his older lover and her daughter.'
  };

  beforeEach(async(() => {
    const movieServiceStub = {
      getById(): Observable<any> {
        return of(mockMovieDetails);
      }
    };

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        OverlayModule,
        BrowserModule,
        MatCardModule,
        MatDialogModule,
        HttpClientTestingModule
      ],
      declarations: [MovieComponent],
      providers: [
        { provide: MovieService, useValue: movieServiceStub },
        MatDialog
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    component.movie = mockMovie;
    fixture.detectChanges();
  });

  it('should create the Movie component', () => {
    expect(component).toBeTruthy();
  });

  it('should mount the title and year', () => {
    const movieTextDebugElement: DebugElement = fixture.debugElement.query(
      By.css('mat-card h3')
    );
    const movieTextElement: HTMLElement = movieTextDebugElement.nativeElement;

    expect(movieTextElement.textContent).toEqual(
      `${mockMovie.Title} (${mockMovie.Year})`
    );
  });

  it('should mount the image and verify the src and alt', () => {
    const imageDebugElement: DebugElement = fixture.debugElement.query(
      By.css('mat-card img')
    );
    const imageElement: HTMLImageElement = imageDebugElement.nativeElement;

    expect(imageElement).toBeDefined;
    expect(imageElement.src).toEqual(mockMovie.Poster);
    expect(imageElement.alt).toEqual(mockMovie.Title);
  });

  it('should fetch movie plot from api and pass it to dialog', () => {
    const dialogOpenSpy = spyOn(MatDialog.prototype, 'open');
    const movieDebugElement: DebugElement = fixture.debugElement.query(
      By.css('mat-card')
    );
    const movieElement: HTMLElement = movieDebugElement.nativeElement;

    movieElement.click();

    expect(dialogOpenSpy).toHaveBeenCalled();
    const dialogOpenCallArgs: any = dialogOpenSpy.calls.mostRecent().args[1]
      .data;
    expect(dialogOpenCallArgs.Title).toEqual(mockMovieDetails.Title);
    expect(dialogOpenCallArgs.Plot).toEqual(mockMovieDetails.Plot);
  });
});
