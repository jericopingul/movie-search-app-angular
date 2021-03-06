import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as MovieActions from '../redux/movies.actions';
import { AppState } from '../models/appstate';

const removeThePrefix = (string: string) => {
  const thePrefix = 'The ';
  if (!string.startsWith(thePrefix)) {
    return string;
  }
  return string.substring(thePrefix.length);
};

const sortByAscTitle = (movies: Movie[]) => {
  return [...movies].sort((current: Movie, next: Movie) => {
    const currentTitle = removeThePrefix(current.Title);
    const nextTitle = removeThePrefix(next.Title);

    if (currentTitle < nextTitle) {
      return -1;
    } else if (currentTitle > nextTitle) {
      return 1;
    }
    return 0;
  });
};

const sortByAscYear = (movies: Movie[]) => {
  return [...movies].sort((current: Movie, next: Movie) => {
    if (current.Year < next.Year) {
      return -1;
    } else if (current.Year > next.Year) {
      return 1;
    }
    return 0;
  });
};

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  appState$: Observable<AppState>;
  movies: Movie[];
  subscription: Subscription;
  loading: boolean;
  error: boolean;

  constructor(private store: Store<AppState>) {
    this.appState$ = this.store.select('app');
  }

  ngOnInit() {
    this.subscription = this.appState$.subscribe(state => {
      this.movies = state.movies;
      this.loading = state.loadStatus.loading;
      this.error = state.loadStatus.error;
      if (state.filter) {
        this.filterByYear(state.filter);
      }
      if (state.sort) {
        this.sortBy(state.sort);
      }
    });
  }

  sortBy(option: string) {
    this.movies =
      option === MovieActions.SORT_YEAR
        ? sortByAscYear(this.movies)
        : sortByAscTitle(this.movies);
  }

  filterByYear(year: string) {
    this.movies = this.movies.filter(
      movie => year === 'All' || year === movie.Year
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
