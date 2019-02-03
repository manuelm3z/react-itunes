import * as syncActions from './actions';
import * as asyncActions from './asyncActions';

const actions = {
  ...syncActions,
  ...asyncActions
};

export default actions;
