/* eslint-disable no-plusplus */
import { takeLatest, call, put } from 'redux-saga/effects';
import {
  FETCH_POPULAR_LIST,
  FETCH_TOPRATED_LIST,
  FETCH_UPCOMING_LIST,
  POPULAR,
  TOP_RATED,
  UPCOMING,
  FETCH_TOP_TODAY_BY_ID,
  TRENDING_ID,
} from './constants';
import { setSuccessData, fetchError, setLoading } from './actions';
import { getMovieList, getMovieById } from '../../helpers/services';

// Individual exports for testing
export default function* movieListPageSaga() {
  yield takeLatest(FETCH_POPULAR_LIST, fetchPopularListSaga);
  yield takeLatest(FETCH_TOPRATED_LIST, fetchTopRatedListSaga);
  yield takeLatest(FETCH_UPCOMING_LIST, fetchUpcomingListSaga);
  yield takeLatest(FETCH_TOP_TODAY_BY_ID, fetchTopTodayByIdSaga);
}

function* fetchPopularListSaga() {
  try {
    yield put(setLoading(true));
    const response = yield call(getMovieList, POPULAR);
    if (response) {
      const { results } = response.data;
      const list = [];
      for (let i = 0; i < 6; i++) {
        list.push(results[i]);
      }
      yield put(setSuccessData(`popularList`, list));
    }
    yield put(setLoading(false));
  } catch (e) {
    yield put(fetchError(e.error));
  }
}
function* fetchTopRatedListSaga() {
  try {
    yield put(setLoading(true));
    const response = yield call(getMovieList, TOP_RATED);
    if (response) {
      const { results } = response.data;
      const list = [];
      for (let i = 0; i < 6; i++) {
        list.push(results[i]);
      }

      yield put(setSuccessData(`topRatedList`, list));
    }
    yield put(setLoading(false));
  } catch (e) {
    yield put(fetchError(e.error));
  }
}
function* fetchUpcomingListSaga() {
  try {
    yield put(setLoading(true));
    const response = yield call(getMovieList, UPCOMING);
    if (response) {
      const { results } = response.data;
      const list = [];
      for (let i = 0; i < 6; i++) {
        list.push(results[i]);
      }
      yield put(setSuccessData(`upcomingList`, list));
    }
    yield put(setLoading(false));
  } catch (e) {
    yield put(fetchError(e.error));
  }
}
function* fetchTopTodayByIdSaga() {
  try {
    yield put(setLoading(true));
    const response = yield call(getMovieById, TRENDING_ID);
    if (response) {
      const { data } = response;
      yield put(setSuccessData(`trending`, data));
    }
    yield put(setLoading(false));
  } catch (e) {
    yield put(fetchError(e.error));
  }
}
