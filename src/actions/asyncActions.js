import {
  requestArtists,
  requestArtistsSuccess,
  requestAlbums,
  requestAlbumsSuccess,
  requestArtist,
  requestArtistSuccess,
  requestArtistSuccessFromCache,
  requestArtistFail,
  requestAlbum,
  requestAlbumSuccess,
  requestAlbumSuccessFromCache,
  requestAlbumFail
} from './actions';
const searchUrl = 'https://itunes.apple.com/search';
const lookupUrl = 'https://itunes.apple.com/lookup';

function fetchArtist(id) {
  return function (dispatch) {
    dispatch(requestArtist(id));
    return fetch(`${lookupUrl}?id=${id}&entity=album`)
      .then(response => response.json())
      .then(json => dispatch(requestArtistSuccess(json.results)))
      .catch(error => dispatch(requestArtistFail()));
  }
}

function fetchAlbum(id) {
  return function (dispatch) {
    dispatch(requestAlbum(id));
    return fetch(`${lookupUrl}?id=${id}&entity=song`)
      .then(response => response.json())
      .then(json => dispatch(requestAlbumSuccess(json.results)))
      .catch(error => dispatch(requestAlbumFail()));
  }
}

function encodeTerm(term) {
  return encodeURI(replaceAll(term));
}

function replaceAll(str, search, replace) {
  return str.split(search).join(replace);
}

function shouldFetchArtist(state, id) {
  const artist = state.artist.previousResults[id];
  if (!artist && !state.artist.isFetching) {
    return true;
  }
  return false;
}

function getArtistFromCache(state, id) {
  return state.artist.previousResults[id];
}

function shouldFetchAlbum(state, id) {
  const album = state.album.previousResults[id];
  if (!album && !state.album.isFetching) {
    return true;
  }
  return false;
}

function getAlbumFromCache(state, id) {
  return state.album.previousResults[id];
}

export function fetchArtists(query) {
  return function (dispatch) {
    dispatch(requestArtists(query));
    return fetch(`${searchUrl}?term=${encodeTerm(query.term)}&media=${query.media}&entity=${query.entity}&limit=${query.limit}&attribute=${query.attribute}`)
      .then(response => response.json())
      .then(json => dispatch(requestArtistsSuccess(json.results)));
  }
}

export function fetchAlbums(query) {
  return function (dispatch) {
    dispatch(requestAlbums(query));
    return fetch(`${searchUrl}?term=${encodeTerm(query.term)}&media=${query.media}&entity=${query.entity}&limit=${query.limit}&attribute=${query.attribute}`)
      .then(response => response.json())
      .then(json => dispatch(requestAlbumsSuccess(json.results)));
  }
}

export function fetchArtistIfNeeded(id) {
  return (dispatch, getState) => {
    const state = getState();
    if (shouldFetchArtist(state, id)) {
      return dispatch(fetchArtist(id));
    } else {
      return dispatch(requestArtistSuccessFromCache(getArtistFromCache(state, id)));
    }
  }
}

export function fetchAlbumIfNeeded(id) {
  return (dispatch, getState) => {
    const state = getState();
    if (shouldFetchAlbum(state, id)) {
      return dispatch(fetchAlbum(id));
    } else {
      return dispatch(requestAlbumSuccessFromCache(getAlbumFromCache(state, id)));
    }
  }
}