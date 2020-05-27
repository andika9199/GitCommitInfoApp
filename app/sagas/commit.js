import {
  GET_COMMIT_LIST_SUCCESS,
  GET_COMMIT_LIST_FAILED,
} from '../redux/actions/types';
import {call, put} from 'redux-saga/effects';
import {searchRepo} from '../configs/apiconfig';

export function* getListCommit(action) {
  try {
    const data = yield call(searchRepo, action.payload);
    yield put({type: GET_COMMIT_LIST_SUCCESS, data});
  } catch (e) {
    yield put({
      type: GET_COMMIT_LIST_FAILED,
      errData: {message: e.message},
    });
  }
}
