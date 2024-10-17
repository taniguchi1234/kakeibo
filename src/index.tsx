import * as React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { Home } from './pages/home'

const GlobalStyle = createGlobalStyle`
    body * {
      box-sizing: border-box;
    }
  `
  
  const Main = (
    <>
      <GlobalStyle />
      <Home />
    </>
  )

render(Main, document.getElementById('app'))
