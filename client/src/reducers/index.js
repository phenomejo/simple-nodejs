import { combineReducers } from 'redux'

import auth from 'reducers/authReducer'
import survey from 'reducers/surveysReducer'

const reducers = combineReducers({
  auth,
  survey
})

export default reducers