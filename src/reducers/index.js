import {
  combineReducers
} from 'redux';
import search from './search';
import artist from './artist';
import album from './album';

export default combineReducers({
  search,
  artist,
  album
});