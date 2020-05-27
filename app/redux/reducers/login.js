import {REQ_LOGIN, REQ_LOGIN_SUCCESS, REQ_LOGIN_FAILED} from '../actions/types';

export const INITIAL_STATE = {
  data: null,
  isFetching: false,
  error: false,
};

export const request = (state) => {
  return {
    ...state,
    data: undefined,
    isFetching: true,
    error: false,
  };
};

export const success = (state, action) => {
  // The api always return success so im creating the condition here for error feedback
  if (!action.data.hasOwnProperty('login')) {
    const errData = {errData: action.data.message};
    return failure(state, errData);
  }
  return {
    ...state,
    data: action.data,
    isFetching: false,
    error: false,
  };
};

export const failure = (state, action) => {
  return {
    ...state,
    data: action.errData,
    isFetching: false,
    error: true,
  };
};

export const reset = () => {
  return INITIAL_STATE;
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQ_LOGIN:
      return request(state, action);
    case REQ_LOGIN_SUCCESS:
      return success(state, action);
    case REQ_LOGIN_FAILED:
      return failure(state, action);
    default:
      return state;
  }
};
