import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_MOVIES_BY_QUERY } from './constants';
import { setSuccessData, fetchError, setLoading } from './actions';
import { searchMovies } from '../../helpers/services';

// Individual exports for testing
export default function* searchPageSaga() {
  yield takeLatest(FETCH_MOVIES_BY_QUERY, searchMoviesByQuerySaga);
}

function* searchMoviesByQuerySaga({ payload }) {
  try {
    yield put(setLoading(true));
    if (payload.length > 0) {
      const response = yield call(searchMovies, payload);
      if (response) {
        const { results } = response.data;
        yield put(setSuccessData(`searchResult`, results));
      }
    } else {
      yield put(setSuccessData(`searchResult`, []));
    }
    yield put(setLoading(false));
  } catch (e) {
    yield put(fetchError(e.error));
  }
}
