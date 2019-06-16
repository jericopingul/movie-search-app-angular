import * as MoviesActions from './movies.actions';
import { Movie } from '../models/movie';
import { AppState } from '../models/appstate';

export type Action = MoviesActions.All;

const defaultState: AppState = {
  movies: [],
  filter: null,
  sort: null,
  loadStatus: {
    loading: false,
    error: false
  }
};

const newState = (state: AppState, newData: object) =>
  Object.assign({}, state, newData);

export function moviesReducer(state: AppState = defaultState, action: Action) {
  switch (action.type) {
    case MoviesActions.NEW_SEARCH:
      return newState(state, {
        movies: action.payload,
        loadStatus: { loading: false, error: false }
      });

    case MoviesActions.FILTER_YEAR:
      return newState(state, { filter: action.payload });

    case MoviesActions.SORT_AZ:
      return newState(state, { sort: MoviesActions.SORT_AZ });

    case MoviesActions.SORT_YEAR:
      return newState(state, { sort: MoviesActions.SORT_YEAR });

    case MoviesActions.UPDATE_LOAD_STATUS:
      return newState(state, { loadStatus: action.payload });

    default:
      return state;
  }
}
