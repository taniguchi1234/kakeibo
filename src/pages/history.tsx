import * as React from 'react'
import { Button } from '../components/button'
import { deleteMemo } from '../indexeddb/memos'


import {
  Link,
  useHistory,
} from 'react-router-dom'
import styled from 'styled-components'
import { Header } from '../components/header'
import {
  getMemoPageCount,
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
  bottom: 3rem;
  left: 0;
  position: fixed;
  right: 0;
  top: 5rem;
  padding: 0 1rem;
  overflow-y: scroll;
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
  const Paging = styled.div`
    bottom: 0;
    height: 3rem;
    left: 0;
    line-height: 2rem;
    padding: 0.5rem;
    position: fixed;
    right: 0;
    text-align: center;
  `
  
  const PagingButton = styled.button`
    background: none;
    border: none;
    display: inline-block;
    height: 2rem;
    padding: 0.5rem 1rem;
  
    &:disabled {
      color: silver;
    }
  `
  
  interface Props {
    setText: (text: string) => void
    setAmount: (amount: string) => void
    setDate: (date: string) => void
    datetime: string
  }
  export const History: React.FC<Props> = (props) => {
    const { setText } = props
    const { setAmount } = props
    const { setDate } = props
    const {datetime} =props
    const [memos, setMemos] = useState<MemoRecord[]>([])
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const history = useHistory()
  
    //useEffect は「副作用 (effect) フック」と呼ばれ、レンダリングの後 に実行
    useEffect(() => {
      getMemos(1).then(setMemos)
      getMemoPageCount().then(setMaxPage)
    }, [])
    const canNextPage: boolean = page < maxPage
    const canPrevPage: boolean = page > 1
    const movePage = (targetPage: number) => {
      if (targetPage < 1 || maxPage < targetPage) {
        return
      }
      setPage(targetPage)
      getMemos(targetPage).then(setMemos)
    }

  //indexDB削除
  const deleteMemo = (): void => {
      deleteMemo
  }

  return (
    <>
      <HeaderArea>
          <Header title="My Money">
        <Navi>
          <button><Atag href = "http://localhost:8080/#/editor">ホームに戻る</Atag>
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
                setAmount(memo.amount)
                setDate(memo.date)
                history.push('/home')
              }}
          >
              <Balance>{memo.balance}</Balance>
              <Date>{memo.date}</Date>
              <Category>{memo.category.value}</Category>
              <Amount>{memo.amount}</Amount>
              <MemoDB>{memo.memo}</MemoDB>
              <button>削除</button>
          </Memo>

          ))}
      </Wrapper>
      <Paging>
          <PagingButton
            onClick={() => movePage(page - 1)}
            disabled={!canPrevPage}
          >
            ＜
          </PagingButton>
          {page} / {maxPage}
          <PagingButton
            onClick={() => movePage(page + 1)}
            disabled={!canNextPage}
          >
            ＞
          </PagingButton>
        </Paging>
      
    </>
  )
}
