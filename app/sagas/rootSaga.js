import {all, takeEvery} from 'redux-saga/effects/';
import * as Types from '../redux/actions/types';
import {reqGitLogin} from './login';
import {getListCommit} from './commit';

export default function* rootSagas() {
  yield all([
    yield takeEvery(Types.REQ_LOGIN, reqGitLogin),
    yield takeEvery(Types.GET_COMMIT_LIST, getListCommit),
  ]);
}
