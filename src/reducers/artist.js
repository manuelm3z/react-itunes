import initialState from '../state';
import * as actionsTypes from '../actions/actionTypes';

const {
  REQUEST_ARTIST,
  REQUEST_ARTIST_SUCCESS,
  REQUEST_ARTIST_SUCCESS_FROM_CACHE,
  REQUEST_ARTIST_FAIL
} = actionsTypes;

export default function artist(state = initialState.artist, action) {
  switch(action.type) {
    case REQUEST_ARTIST:
      return {
        ...state,
        isFetching: true
      };
    case REQUEST_ARTIST_SUCCESS:
      const artist = action.result[0];
      const albums = action.result.filter((item, index) => {
        return index > 0 && item.wrapperType === 'collection';
      });
      return {
        ...state,
        isFetching: false,
        artistName: artist.artistName,
        primaryGenreName: artist.primaryGenreName,
        albums,
        previousResults: {
          ...state.previousResults,
          [artist.artistId]: {
            ...artist,
            albums
          }
        }
      };
    case REQUEST_ARTIST_SUCCESS_FROM_CACHE:
      return {
        ...state,
        isFetching: false,
        artistName: action.artist.artistName,
        primaryGenreName: action.artist.primaryGenreName,
        albums: action.artist.albums
      };
    case REQUEST_ARTIST_FAIL:
      return {
        ...state,
        isFetching: false,
        artistName: '',
        primaryGenreName: '',
        albums: []
      };
    default:
      return state;
  }
}