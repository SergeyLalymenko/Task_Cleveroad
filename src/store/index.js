import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from './reducers/stickers'



export default createStore(reducer, applyMiddleware(thunk, logger))