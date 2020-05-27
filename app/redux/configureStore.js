import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';

// Implementing Redux Saga
export default function configureStore() {
  const rootReducer = combineReducers({
    login: require('./reducers/login').reducer,
    commit: require('./reducers/commit').reducer,
  });
  const sagaMiddleware = createSagaMiddleware();
  let store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return store;
}
