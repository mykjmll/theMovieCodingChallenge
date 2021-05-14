import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the movieListPage state domain
 */

const selectMovieListPageDomain = state => state.movieListPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MovieListPage
 */

const makeSelectMovieListPage = () =>
  createSelector(
    selectMovieListPageDomain,
    substate => substate,
  );

export default makeSelectMovieListPage;
export { selectMovieListPageDomain };
