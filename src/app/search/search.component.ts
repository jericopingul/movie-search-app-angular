import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Store } from '@ngrx/store';
import * as MovieActions from '../redux/movies.actions';
import { Subscription } from 'rxjs';
import { AppState } from '../models/appstate';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  name: string = '';
  subscription: Subscription;

  constructor(
    private movieService: MovieService,
    private store: Store<AppState>
  ) {
    this.store.select('app');
  }

  ngOnInit() {}

  onSubmit() {
    this.store.dispatch(new MovieActions.NewSearch([]));
    this.store.dispatch(new MovieActions.UpdateLoadStatus({ loading: true }));
    this.subscription = this.movieService.search(this.name).subscribe(
      response =>
        this.store.dispatch(new MovieActions.NewSearch(response.Search)),
      err => {
        this.store.dispatch(
          new MovieActions.UpdateLoadStatus({ loading: false, error: true })
        );
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
