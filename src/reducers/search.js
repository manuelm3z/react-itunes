import initialState from '../state';
import * as actionsTypes from '../actions/actionTypes';

const {
  REQUEST_ARTISTS,
  REQUEST_ALBUMS,
  REQUEST_ARTISTS_SUCCESS,
  REQUEST_ALBUMS_SUCCESS
} = actionsTypes;

export default function search(state = initialState.search, action) {
  switch (action.type) {
    case REQUEST_ARTISTS:
    case REQUEST_ALBUMS:
      return {
        ...state,
        isFetching: true,
        query: {
          ...state.query,
          term: action.term,
          entity: action.entity,
          attribute: action.attribute
        }
      };
    case REQUEST_ARTISTS_SUCCESS:
    case REQUEST_ALBUMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        results: action.results
      };
    default:
      return state;
  }
}