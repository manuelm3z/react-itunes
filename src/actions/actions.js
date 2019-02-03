import {
  REQUEST_ARTISTS,
  REQUEST_ALBUMS,
  REQUEST_ARTISTS_SUCCESS,
  REQUEST_ARTISTS_FAIL,
  REQUEST_ALBUMS_SUCCESS,
  REQUEST_ALBUMS_FAIL,
  REQUEST_ARTIST,
  REQUEST_ARTIST_SUCCESS,
  REQUEST_ARTIST_SUCCESS_FROM_CACHE,
  REQUEST_ARTIST_FAIL,
  REQUEST_ALBUM,
  REQUEST_ALBUM_SUCCESS,
  REQUEST_ALBUM_SUCCESS_FROM_CACHE,
  REQUEST_ALBUM_FAIL
} from './actionTypes';

export function requestArtists(query) {
  return {
    type: REQUEST_ARTISTS,
    ...query
  };
}

export function requestArtistsSuccess(results) {
  return {
    type: REQUEST_ARTISTS_SUCCESS,
    results
  };
}

export function requestArtistsFail() {
  return {
    type: REQUEST_ARTISTS_FAIL
  };
}

export function requestAlbums(query) {
  return {
    type: REQUEST_ALBUMS,
    ...query
  };
}

export function requestAlbumsSuccess(results) {
  return {
    type: REQUEST_ALBUMS_SUCCESS,
    results
  };
}

export function requestAlbumsFail() {
  return {
    type: REQUEST_ALBUMS_FAIL
  };
}

export function requestArtist(id) {
  return {
    type: REQUEST_ARTIST,
    id
  };
}

export function requestArtistSuccess(result) {
  return {
    type: REQUEST_ARTIST_SUCCESS,
    result
  };
}

export function requestArtistSuccessFromCache(artist) {
  return {
    type: REQUEST_ARTIST_SUCCESS_FROM_CACHE,
    artist
  };
}

export function requestArtistFail() {
  return {
    type: REQUEST_ARTIST_FAIL
  };
}

export function requestAlbum(id) {
  return {
    type: REQUEST_ALBUM,
    id
  };
}

export function requestAlbumSuccess(result) {
  return {
    type: REQUEST_ALBUM_SUCCESS,
    result
  };
}

export function requestAlbumSuccessFromCache(album) {
  return {
    type: REQUEST_ALBUM_SUCCESS_FROM_CACHE,
    album
  };
}

export function requestAlbumFail() {
  return {
    type: REQUEST_ALBUM_FAIL
  };
}