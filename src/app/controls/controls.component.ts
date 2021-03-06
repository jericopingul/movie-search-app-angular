import { Component, OnInit } from '@angular/core';
import * as MovieActions from '../redux/movies.actions';
import { Movie } from '../models/movie';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '../models/appstate';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  yearOptions: Set<string>;
  appState$: Observable<AppState>;
  subscription: Subscription;
  sortOptions: any[] = [
    {
      key: MovieActions.SORT_YEAR,
      value: 'Oldest > Newest'
    },
    {
      key: MovieActions.SORT_AZ,
      value: 'A > Z'
    }
  ];

  constructor(private store: Store<AppState>) {
    this.appState$ = this.store.select('app');
  }

  ngOnInit() {
    this.subscription = this.appState$.subscribe(state => {
      this.updateYearOptions(state.movies);
    });
  }

  onSortToggle(option: any) {
    if (option.value === MovieActions.SORT_YEAR) {
      this.store.dispatch(new MovieActions.SortYear());
    } else {
      this.store.dispatch(new MovieActions.SortAz());
    }
  }

  onFilterSelect(year: any) {
    this.store.dispatch(new MovieActions.FilterYear(year.value));
  }

  updateYearOptions(movies: Movie[]) {
    this.yearOptions = new Set([
      'All',
      ...((movies && movies.map(movie => movie.Year).sort()) || [])
    ]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
