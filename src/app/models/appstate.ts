import { Movie } from './movie';

export interface LoadStatus {
  loading: boolean;
  error: boolean;
}

export interface AppState {
  movies: Movie[];
  filter: string;
  sort: string;
  loadStatus: LoadStatus;
}
