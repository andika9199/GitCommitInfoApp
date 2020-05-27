import {createAction} from 'redux-actions';
import {
  GET_COMMIT_LIST,
  GET_COMMIT_LIST_SUCCESS,
  GET_COMMIT_LIST_FAILED,
} from './types';

export const getCommit = createAction(GET_COMMIT_LIST);
export const getCommitSuccess = createAction(GET_COMMIT_LIST_SUCCESS);
export const getCommitFailed = createAction(GET_COMMIT_LIST_FAILED);
