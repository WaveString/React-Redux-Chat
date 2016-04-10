import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import ChatApp from './components/chat/chat';
import * as chat from './reducers/chat';

import './styles/main';

const reducer = combineReducers(chat);
const store = createStore(reducer);
const App = () => (
  <Provider store={store}>
    <ChatApp />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('content'));
