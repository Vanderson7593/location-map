import { combineReducers } from '@reduxjs/toolkit'
import appReducer from './app/app.slice'

const rootReducer = combineReducers({
  app: appReducer,
})

export default rootReducer