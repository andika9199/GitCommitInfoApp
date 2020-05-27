import {REQ_LOGIN_SUCCESS, REQ_LOGIN_FAILED} from '../redux/actions/types';
import {call, put} from 'redux-saga/effects';
import {loginGit} from '../configs/apiconfig';

export function* reqGitLogin(action) {
  try {
    const data = yield call(loginGit, action.payload);
    yield put({type: REQ_LOGIN_SUCCESS, data});
  } catch (e) {
    yield put({
      type: REQ_LOGIN_FAILED,
      errData: {message: e.message},
    });
  }
}
