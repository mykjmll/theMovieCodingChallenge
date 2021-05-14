import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the favoritesPage state domain
 */

const selectFavoritesPageDomain = state => state.favoritesPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FavoritesPage
 */

const makeSelectFavoritesPage = () =>
  createSelector(
    selectFavoritesPageDomain,
    substate => substate,
  );

export default makeSelectFavoritesPage;
export { selectFavoritesPageDomain };
