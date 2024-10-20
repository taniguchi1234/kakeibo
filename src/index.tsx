import * as React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Home } from './pages/home'
import { History } from './pages/history'

const GlobalStyle = createGlobalStyle`
    body * {
      box-sizing: border-box;
    }
  `
  
  const Main = (
    <>
      <GlobalStyle />
      <Router>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/history">
          <History />
        </Route>
        <Redirect to="/home" path="*" />
      </Router>
    </>
  )

render(Main, document.getElementById('app'))
