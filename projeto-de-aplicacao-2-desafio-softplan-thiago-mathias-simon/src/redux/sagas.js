import { all } from 'redux-saga/effects';

import processoSaga from './processo/sagas';

export default function* rootSaga() {
    yield all([
        processoSaga()
    ])
}