/*
 *
 * SearchPage actions
 *
 */

import {
  FETCH_MOVIES_BY_QUERY,
  SET_SUCCESS_DATA,
  FETCH_ERROR,
  SET_LOADING,
  SET_QUERY
} from './constants';

export function fetchMoviesByQuery(payload) {
  return {
    type: FETCH_MOVIES_BY_QUERY,
    payload,
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
export function setQuery(payload) {
  return {
    type: SET_QUERY,
    payload,
  };
}
