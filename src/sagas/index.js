import { put, takeEvery, all } from 'redux-saga/effects';
// import { put, takeEvery, spawn, call } from 'redux-saga/effects';

import * as Count from '../constants';

const delay = (ms) => new Promise(res => setTimeout(res, ms))

// Our worker Saga: will perform the async increment task
function* handleIncrementAsync(action) {
  yield delay(2000);
  yield put({ type: Count.increment, payload: action.payload });
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchIncrementAsync() {
  yield takeEvery(Count.incrementAsync, handleIncrementAsync)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  // Does not offer great error handling at the saga level
  yield all([
    watchIncrementAsync()
    // more could go here!!!
  ])
}

































  // Behaves similarly to above with no blocking
  // yield fork(helloSaga);
  // yield fork(watchIncrementAsync)

  // All connected to underlying parent (errors will bubble up!)
  //const [task1, task2] = yield all([fork(helloSaga), fork(watchIncrementAsync)])

  // Keeps root alive
  // yield spawn(helloSaga);
  // yield spawn(watchIncrementAsync)

  /* *************************************************************

      SEEMS THAT THE METHOD BELOW HAS BEEN "DEPRECATED"

  ************************************************************* */
  // Keep EVERYTHING alive
  // const sagas = [
  //   helloSaga,
  //   watchIncrementAsync
  // ];

  // yield sagas.map(saga =>
  //   spawn(function* () {
  //     while (true) {
  //       try {
  //         yield call(saga)
  //         break
  //       } catch (e) {
  //         console.log(e)
  //       }
  //     }
  //   })
  // );
