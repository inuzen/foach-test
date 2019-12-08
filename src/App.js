import React from 'react';
import './App.css';
import Register from './components/register/Register';
import ItemList from './components/items/ItemList';
import {Provider} from 'react-redux';
import store from './store';

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
  <Provider store={store}>
    <div className="App">
      <Router>
      <Switch>
        <Route exact path='/' component={Register}/>
        <Route path='/items' component={ItemList}/>
      </Switch>
    </Router>
    </div>
  </Provider>
  );
}

export default App;
