import initialState from '../state';
import * as actionsTypes from '../actions/actionTypes';

const {
  REQUEST_ALBUM,
  REQUEST_ALBUM_SUCCESS,
  REQUEST_ALBUM_SUCCESS_FROM_CACHE,
  REQUEST_ALBUM_FAIL
} = actionsTypes;

export default function album(state = initialState.album, action) {
  switch(action.type) {
    case REQUEST_ALBUM:
      return {
        ...state,
        isFetching: true
      };
    case REQUEST_ALBUM_SUCCESS:
      const album = action.result[0];
      const songs = action.result.filter((item, index) => {
        return index > 0 && item.wrapperType === 'track';
      });
      return {
        ...state,
        isFetching: false,
        collectionName: album.collectionName,
        releaseDate: album.releaseDate,
        cover: album.artworkUrl100,
        artistName: album.artistName,
        artistId: album.artistId,
        primaryGenreName: album.primaryGenreName,
        songs,
        previousResults: {
          ...state.previousResults,
          [album.collectionId]: {
            ...album,
            songs
          }
        }
      };
    case REQUEST_ALBUM_SUCCESS_FROM_CACHE:
      return {
        ...state,
        isFetching: false,
        collectionName: action.album.collectionName,
        releaseDate: action.album.releaseDate,
        cover: action.album.artworkUrl100,
        artistName: action.album.artistName,
        artistId: action.album.artistId,
        primaryGenreName: action.album.primaryGenreName,
        songs: action.album.songs
      };
    case REQUEST_ALBUM_FAIL:
      return {
        ...state,
        isFetching: false,
        collectionName: '',
        releaseDate: '',
        cover: '',
        artistName: '',
        artistId: '',
        primaryGenreName: '',
        songs: []
      };
    default:
      return state;
  }
}