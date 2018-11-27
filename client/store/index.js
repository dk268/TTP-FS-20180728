import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import stocks from './stocks';
import trades from './trades';

export const [UNASKED, LOADING, LOADED, ERROR] = [
  `UNASKED`,
  `LOADING`,
  `LOADED`,
  `ERROR`,
];

export const aCF = (type, payload) => ({ type, payload });

const reducer = combineReducers({ user, stocks, trades });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
