/*
 *
 * MovieListPage actions
 *
 */

import {
  FETCH_POPULAR_LIST,
  FETCH_TOPRATED_LIST,
  FETCH_UPCOMING_LIST,
  FETCH_TOP_TODAY_BY_ID,
  SET_SUCCESS_DATA,
  FETCH_ERROR,
  SET_LOADING,
} from './constants';

export function fetchPopularList() {
  return {
    type: FETCH_POPULAR_LIST,
  };
}
export function fetchTopRatedList() {
  return {
    type: FETCH_TOPRATED_LIST,
  };
}
export function fetchUpcomingList() {
  return {
    type: FETCH_UPCOMING_LIST,
  };
}

export function fetchTopTodayById() {
  return {
    type: FETCH_TOP_TODAY_BY_ID,
  };
}

export function setSuccessData(key, value) {
  return {
    type: SET_SUCCESS_DATA,
    key,
    value,
  };
}

export function fetchError(payload) {
  return {
    type: FETCH_ERROR,
    payload,
  };
}
export function setLoading(payload) {
  return {
    type: SET_LOADING,
    payload,
  };
}
