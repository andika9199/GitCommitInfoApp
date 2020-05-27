import {createAction} from 'redux-actions';
import {REQ_LOGIN, REQ_LOGIN_SUCCESS, REQ_LOGIN_FAILED} from './types';

export const reqLogin = createAction(REQ_LOGIN);
export const reqLoginSuccess = createAction(REQ_LOGIN_SUCCESS);
export const reqLoginFailed = createAction(REQ_LOGIN_FAILED);
