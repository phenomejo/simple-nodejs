import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import reduucers from 'reducers'


export default ({ children, innitState}) => {
  const composeEnhancers  = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store =  createStore(
    reduucers,
    innitState,
    composeEnhancers(applyMiddleware(reduxThunk))
  )
  return (
    <Provider store={store}>
      { children }
    </Provider>
  )
}