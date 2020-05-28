import React from 'react'
import ReactDOM from 'react-dom'

import'materialize-css/dist/css/materialize.min.css'
import 'style/custom.css'

import Root from 'Root'
import App from 'components/App'

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById('root')
)