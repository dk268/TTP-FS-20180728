import axios from 'axios';
import history from '../history';
import { aCF, UNASKED, LOADED, ERROR, LOADING } from '.';
import Axios from 'axios';
import { IEXClient } from 'iex-api';
import _fetch from 'isomorphic-fetch';

const iex = new IEXClient(_fetch);

/**
 * ACTION TYPES
 */

const ERROR_STOCKS = 'ERROR_STOCKS';
const LOADING_STOCKS = 'LOADING_STOCKS';
const LOADED_STOCKS = 'LOADED_STOCKS';
const ADD_STOCK = 'ADD_STOCK';

export const getStocks = id => async dispatch => {
  try {
    dispatch(aCF(LOADING_STOCKS));
    const stocks = await Axios.get(`/api/users/${id}/stocks`);
    for (let stock of stocks.data) {
      const returned = await iex.stockOpenClose(stock.stockSymbol);
      stock.openPrice = returned.open.price;
      stock.currentPrice = await iex.stockPrice(stock.stockSymbol);
    }
    dispatch(aCF(LOADED_STOCKS, stocks.data));
    return stocks.data;
  } catch (e) {
    dispatch(aCF(ERROR_STOCKS, e));
  }
};

export const addStock = stock => async dispatch => {};

const defaultState = {
  status: UNASKED,
  collection: [],
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case LOADING_STOCKS: {
      return { ...state, status: LOADING };
    }
    case LOADED_STOCKS: {
      return { ...state, status: LOADED, collection: action.payload };
    }
    case ADD_STOCK: {
      return { ...state, collection: [...state.collection, action.payload] };
    }
    case ERROR_STOCKS: {
      return { ...state, status: ERROR, error: action.payload };
    }
    default:
      return state;
  }
}
