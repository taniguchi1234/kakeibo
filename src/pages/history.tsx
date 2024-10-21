import * as React from 'react'
import { Button } from '../components/button'

import {
  Link,
  useHistory,
} from 'react-router-dom'
import styled from 'styled-components'
import { Header } from '../components/header'
import {
  getMemos,
  MemoRecord,
} from '../indexeddb/memos'

const { useState, useEffect } = React

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
const Memo = styled.button`
    display: block;
    background-color: white;
    border: 1px solid gray;
    width: 100%;
    padding: 1rem;
    margin: 1rem 0;
    text-align: left;
  `
  
  const Balance = styled.div`
    font-size: 1rem;
    margin-bottom: 0.5rem;
  `
  
  const Date = styled.div`
    font-size: 0.85rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `
  const Category = styled.div`
    font-size: 0.85rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `
  const Amount = styled.div`
    font-size: 0.85rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `
  const MemoDB = styled.div`
    font-size: 0.85rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `
  
  interface Props {
    setText: (text: string) => void
  }
  export const History: React.FC<Props> = (props) => {
    const { setText } = props
    const [memos, setMemos] = useState<MemoRecord[]>([])
    const history = useHistory()
  
    //useEffect は「副作用 (effect) フック」と呼ばれ、レンダリングの後 に実行
    useEffect(() => {
      getMemos().then(setMemos)
    }, [])

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
        {memos.map(memo => (
          <Memo
              key={memo.datetime}
              onClick={() => {
                setText(memo.memo)
                history.push('/home')
              }}
            >
              <Balance>{memo.balance}</Balance>
              <Date>{memo.date}</Date>
              <Category>{memo.category.value}</Category>
              <Amount>{memo.amount}</Amount>
              <MemoDB>{memo.memo}</MemoDB>
            </Memo>
          ))}
      </Wrapper>
      
    </>
  )
}
