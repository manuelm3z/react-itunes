import {
  createStore,
  applyMiddleware
} from 'redux';
import {
  createLogger
} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import app from '../reducers';

const loggerMiddleware = createLogger();

export default createStore(app, applyMiddleware(thunkMiddleware, loggerMiddleware));