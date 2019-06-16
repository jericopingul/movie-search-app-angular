import { Action } from '@ngrx/store';
import { Movie } from '../models/movie';

export const NEW_SEARCH = 'NEW_SEARCH';
export const FILTER_YEAR = 'FILTER_YEAR';
export const SORT_AZ = 'SORT_AZ';
export const SORT_YEAR = 'SORT_YEAR';
export const UPDATE_LOAD_STATUS = 'UPDATE_LOAD_STATUS';

export class NewSearch implements Action {
  readonly type = NEW_SEARCH;
  constructor(public payload: Movie[]) {}
}

export class FilterYear implements Action {
  readonly type = FILTER_YEAR;
  constructor(public payload: string) {}
}

export class SortAz implements Action {
  readonly type = SORT_AZ;
}

export class SortYear implements Action {
  readonly type = SORT_YEAR;
}

export class UpdateLoadStatus implements Action {
  readonly type = UPDATE_LOAD_STATUS;
  constructor(public payload: object) {}
}

export type All = NewSearch | FilterYear | SortAz | SortYear | UpdateLoadStatus;
