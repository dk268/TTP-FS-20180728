import axios from 'axios';
import history from '../history';
import { aCF, UNASKED, LOADED, ERROR, LOADING } from '.';
import Axios from 'axios';

/**
 * ACTION TYPES
 */

const ERROR_TRADES = 'ERROR_TRADES';
const LOADING_TRADES = 'LOADING_TRADES';
const LOADED_TRADES = 'LOADED_TRADES';
const ADD_TRADE = 'ADD_TRADE';

export const getTrades = id => async dispatch => {
  try {
    dispatch(aCF(LOADING_TRADES));
    const trades = await Axios.get(`/api/users/${id}/trades`);
    dispatch(aCF(LOADED_TRADES, trades.data));
    return trades.data;
  } catch (e) {
    dispatch(aCF(ERROR_TRADES, e));
  }
};

export const addTrade = trade => async dispatch => {
  try {
    dispatch(aCF(LOADING_TRADES));
    const newTrade = await Axios.post(`/api/trades`, trade);
    dispatch(aCF(ADD_TRADE, newTrade.data));
    return newTrade.data;
  } catch (e) {
    dispatch(aCF(ERROR_TRADES, e));
  }
};

const defaultState = {
  status: UNASKED,
  collection: [],
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case LOADING_TRADES: {
      return { ...state, status: LOADING };
    }
    case LOADED_TRADES: {
      return { ...state, status: LOADED, collection: action.payload };
    }
    case ADD_TRADE: {
      return {
        ...state,
        status: LOADED,
        collection: [...state.collection, action.payload],
      };
    }
    case ERROR_TRADES: {
      return { ...state, status: ERROR, error: action.payload };
    }
    default:
      return state;
  }
}
