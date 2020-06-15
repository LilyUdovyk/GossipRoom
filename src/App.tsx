import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { ConnectedRouter, routerMiddleware } from 'connected-react-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSmile,
         faPaperclip,
         faPaperPlane,
         faBars,
         faUserFriends,
         faComments,
         faSignOutAlt,
         faFileAlt,
         faFileArchive,
         faFile,
         faFileVideo,
         faFileAudio,
         faTimes,
         faCheckCircle,
         faExclamationCircle,
         faReply,
         faShare,
         faCogs
       } from '@fortawesome/free-solid-svg-icons'

import rootReducer from './store/rootReducer';
import rootSaga from './store/rootSaga';
import { history } from './history';
import Routes from './Routes';

library.add(faSmile,
            faPaperclip,
            faPaperPlane,
            faBars,
            faUserFriends,
            faComments,
            faSignOutAlt,
            faFileAlt,
            faFileArchive, 
            faFile,
            faFileVideo,
            faFileAudio,
            faTimes,
            faCheckCircle,
            faExclamationCircle,
            faReply,
            faShare,
            faCogs
          )

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(
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
  )
}

export default App;
