/*
 *
 * MovieListPage reducer
 *
 */
import produce from 'immer';
import { SET_SUCCESS_DATA, FETCH_ERROR, SET_LOADING } from './constants';

export const initialState = {
  loading: false,
  popularList: [],
  topRatedList: [],
  upcomingList: [],
  trending: [],
  error: '',
};

/* eslint-disable default-case, no-param-reassign */
const movieListPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_LOADING:
        draft.loading = action.payload;
        break;
      case SET_SUCCESS_DATA:
        draft[action.key] = action.value;
        break;
      case FETCH_ERROR:
        draft.error = action.payload;
        break;
    }
  });

export default movieListPageReducer;
