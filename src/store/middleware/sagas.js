import sagaMiddleware from 'redux-saga';
import recorder from '../sagas/recorder';
import timers from '../sagas/timers';

const sagas = sagaMiddleware(...[recorder, timers]);

export default sagas;
