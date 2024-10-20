import * as React from 'react'
import { Button } from '../components/button'

import {
  Link,
  useHistory,
} from 'react-router-dom'
import styled from 'styled-components'
import { Header } from '../components/header'

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
  border-bottom: 1px solid silver;
`

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 5rem;
  padding: 0 1rem;
`
const Navi =  styled.div`
  display: flex;
  justify-content: space-around;
  width:150px;
  height: 60px;
  position: relative
`
const Atag = styled.a`
  border: none;
  color:black;
`



export const History: React.FC = () => {
  return (
    <>
      <HeaderArea>
          <Header title="Markdown Editor">
        <Navi>
          <button><Atag href = "http://localhost:8080/#/editor">homeに戻る</Atag>
          </button>
        </Navi>
      </Header>
      </HeaderArea>
      <Wrapper>
          TODO: 履歴表示
      </Wrapper>
      
    </>
  )
}
