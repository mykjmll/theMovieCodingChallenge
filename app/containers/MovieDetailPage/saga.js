import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_MOVIE_BY_ID } from './constants';
import { setSuccessData, fetchError, setLoading } from './actions';
import { getMovieById } from '../../helpers/services';

// Individual exports for testing
export default function* movieDetailPagePageSaga() {
  yield takeLatest(FETCH_MOVIE_BY_ID, fetchMovieByIdSaga);
}

function* fetchMovieByIdSaga({ payload }) {
  try {
    yield put(setLoading(true));
    if (payload.length > 0) {
      const response = yield call(getMovieById, payload);
      if (response) {
        const { data } = response;
        yield put(setSuccessData(`details`, data));
      }
    } else {
      yield put(setSuccessData(`details`, null));
    }
    yield put(setLoading(false));
  } catch (e) {
    yield put(fetchError(e.error));
  }
}
