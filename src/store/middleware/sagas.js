import sagaMiddleware from 'redux-saga';
import recorder from '../sagas/recorder';

const sagas = sagaMiddleware(...[recorder]);

export default sagas;
