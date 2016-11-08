import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import {VotingContainer} from './components/Voting';
import {FinalResultsContainer} from './components/FinalResults';

import {Router, Route, hashHistory} from 'react-router';

import reducer from './reducer';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';

import {setState} from './actions';
import remoteActionMiddleware from './remote_action_middleware';

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state =>
  store.dispatch(setState(state))
);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);



const routes = <Route>
  <Route path="/" component={VotingContainer} />
  <Route path="/results" component={FinalResultsContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);