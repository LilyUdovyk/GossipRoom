import React from 'react';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'


import rootReducer from './store/rootReducer';
import rootSaga from './store/rootSaga';
import { history } from './history';
import Routes from './Routes';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(
  routerMiddleware(history),
  sagaMiddleware,
))

sagaMiddleware.run(rootSaga)

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
