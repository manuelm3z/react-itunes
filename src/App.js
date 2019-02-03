import React, {
  Component
} from 'react';
import Search from './pages/containers/Search';
import Artist from './pages/containers/Artist';
import Album from './pages/containers/Album';
import 'antd/dist/antd.css';
import {
  Switch,
  Route,
  BrowserRouter
} from "react-router-dom";
import {
  Provider
} from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider
        store={store}
        >
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Search}/>
            <Route path='/artist/:artist' component={Artist}/>
            <Route path='/album/:album' component={Album}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
