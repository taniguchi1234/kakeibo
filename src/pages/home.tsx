import * as React from 'react'
import styled from 'styled-components'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { putMemo } from '../indexeddb/memos'
import { Button } from '../components/button'

const { useState } = React

const Header = styled.header`
  /* font-size: 1.5rem;
  height: 2rem;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 0;
  top: 0;*/
  justify-content: space-around;
  display: flex;
  border-bottom: 1px solid silver;
`

const Navi =  styled.div`
  display: flex;
  justify-content: space-around;
  width:250px;
  height: 60px;
  position: relative
`
const buttun =  styled.button`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
`

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  display: flex;
  right: 0;
  top:10rem;
`

const Form = styled.div`
  font-size: 1rem;
  padding: 0.7rem;
  top: 0;
  right:0;
  width: 30%;
`
const Nyuryoku = styled.h2`
  text-align :center;
`

const InputSection = styled.section`
    display: flex;
    justify-content: space-around;

`
const InputSectiondiv= styled.div`
    margin: 0 10px 10px 0;
    flex-grow: 1;

`

const Inputlabel= styled.label`
  display:block;

`

const TextArea = styled.textarea`



`


const Submit= styled.div`
    display: block;
    text-align: center;

`
const Submitbuttun= styled.button`
    width: 120px;
    height: 40px;

`

  const  Calendar= styled.div`
    bottom: 0;
    overflow-y: scroll;
    padding: 1rem;
    width: 50vw;
    top: 0;
`
const StorageKey = 'pages/home:text'

export const Home: React.FC = () => {
  const [text, setText] = useState<string>(localStorage.getItem(StorageKey) || '')
  

  return (
    <>
      <Header>
      <h1>MyMoney</h1>
        <Navi>
          <button>ホーム</button>
          <button>入出金一覧</button>
          <button>グラフ</button>
        </Navi>
      </Header>
      <Wrapper>
        <Calendar>
          <FullCalendar plugins={[dayGridPlugin]}/>
        </Calendar> 
        <Form>
          <Nyuryoku>入力</Nyuryoku>
            <InputSection>
              <InputSectiondiv>
              <Inputlabel>収支</Inputlabel>
                <Inputlabel>日付</Inputlabel>
                <Inputlabel>カテゴリ</Inputlabel>
                <select>
                    <option>-選択してください-</option>
                    <option>食費</option>
                    <option>趣味</option>
                    <option>交際費</option>
                    <option>交通費</option>
                    <option>ファッション</option>
                    <option>家賃</option>
                    <option>その他</option>
                </select>
              </InputSectiondiv>
              <InputSectiondiv>
                <Inputlabel>金額</Inputlabel>
                  <Inputlabel>メモ</Inputlabel>
                    <TextArea
                      onChange={(event) => {
                      const changedText = event.target.value
                      localStorage.setItem(StorageKey, changedText)
                      setText(changedText)
                    }}
                      value={text}
                    />
              </InputSectiondiv>
            </InputSection>
            
        </Form>
        
      
      
      </Wrapper>

      
      
      
    </>
  )
}
