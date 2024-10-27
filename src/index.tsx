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
import { useStateWithStorage } from './hooks/use_state_with_storage'

const GlobalStyle = createGlobalStyle`
    body * {
      box-sizing: border-box;
    }
  `
const StorageKey = '/home:text'
const StorageKeyAmount = '/home:amount'
const StrorageKeyDate = '/home:date'
// const StrorageKeyCategory = '/home:category'
// const StrorageKeyBalance = '/home:balance'
const StrorageDatetime = '/home:datetime'
  
const Main: React.FC = () => {
  const [text, setText] = useStateWithStorage('', StorageKey)
  const [amount, setAmount] = useStateWithStorage('', StorageKeyAmount)
  const [date, setDate] = useStateWithStorage('', StrorageKeyDate)
  // const [category, setCategory] = useStateWithStorage('', StrorageKeyCategory)
  // const [balance, setBalance] = useStateWithStorage('', StrorageKeyBalance)
  const [datetime  ,setDatetime ]= useStateWithStorage('',StrorageDatetime)

  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/home">
            <Home
              text={text}
              setText={setText}
              amount = {amount}
              setAmount = {setAmount}
              date = {date}
              setDate = {setDate}
              // category = {category}
              // setCategory = {setCategory}
              // balance = {balance}
              // setBalance = {setBalance}
              // datetime= {datetime}
            />
          </Route>
          <Route exact path="/history">
            <History
              setAmount = {setAmount}
              setText={setText}
              setDate ={setDate}
              datetime={datetime}
              // setCategory={setCategory}
              // setBalance={setBalance}

            />
          </Route>
          <Redirect to="/home" path="*" />
        </Switch>
      </Router>
    </>
  )
}

render(<Main />, document.getElementById('app'))
