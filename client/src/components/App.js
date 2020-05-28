import React, { useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import history from 'utils/history'
import Header from 'components/Header'
import Dashboard from 'components/Dashboard'
import SurveyNew from 'components/SurveyNew'
import Landing from 'components/Landing'
import { fetchUser } from 'actions/index'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  const path = history.location.pathname

  useEffect(() => {
    if (user && path === '/') {
      history.push('/surveys')
    }
  }, [user, path])

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  return (
    <div className="container">
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/surveys" exact component={Dashboard} />
          <Route path="/surveys/new" exact component={SurveyNew} />
        </Switch>
      </Router>
      {/* <a href="/auth/google">Sign In</a><br />
      <button onClick={e => history.push('/')}>click</button> */}
    </div>
  )
}

export default App