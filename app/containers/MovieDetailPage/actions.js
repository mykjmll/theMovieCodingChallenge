/*
 *
 * MovieDetailPage actions
 *
 */
import {
  FETCH_MOVIE_BY_ID,
  SET_SUCCESS_DATA,
  FETCH_ERROR,
  SET_LOADING,
} from './constants';

export function fetchMovieById(payload) {
  return {
    type: FETCH_MOVIE_BY_ID,
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
