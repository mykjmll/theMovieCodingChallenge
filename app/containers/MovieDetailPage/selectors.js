import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the movieDetailPage state domain
 */

const selectMovieDetailPageDomain = state =>
  state.movieDetailPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MovieDetailPage
 */

const makeSelectMovieDetailPage = () =>
  createSelector(
    selectMovieDetailPageDomain,
    substate => substate,
  );

export default makeSelectMovieDetailPage;
export { selectMovieDetailPageDomain };
