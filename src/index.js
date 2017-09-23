import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import App from './containers/App'
import Search from './containers/Search'
import NoMatch from './containers/NoMatch'

import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/search" component={Search} />
      <Route component={NoMatch} />
    </Switch>
  </BrowserRouter>
, document.getElementById('root'))
