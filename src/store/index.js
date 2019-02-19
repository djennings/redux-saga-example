import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { loadState, saveState } from './stateStore';
import createSagaMiddleware from 'redux-saga';

import { counterReducer } from '../redux/counter';
import { loadingReducer } from '../redux/ui';

import rootSaga from '../sagas';

import cheesyMiddleware from '../cheesyMiddeware';

const sagaMiddleware = createSagaMiddleware();

// Obviously trivial and unnecessary need to 'slice' state here
// but example of how to get reducers to specialize!!!
const rootReducer = combineReducers({
  counter: counterReducer,
  isLoading: loadingReducer
});

const persisetedState = loadState();

//create store
export const store = createStore(
  rootReducer,
  persisetedState,
  compose(
    applyMiddleware(sagaMiddleware, cheesyMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
  )
);

store.subscribe(() => {
  saveState(
    { counter: store.getState().counter });
})

sagaMiddleware.run(rootSaga);
