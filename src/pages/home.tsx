import * as React from 'react'
import styled from 'styled-components'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { putMemo } from '../indexeddb/memos'
import { Button } from '../components/button';
import Select from 'react-select'
import { Link } from 'react-router-dom'
import { Header } from '../components/header'
import { useStateWithStorage } from '../hooks/use_state_with_storage'


const { useState } = React

// const Header = styled.header`

//   justify-content: space-around;
//   display: flex;
//   border-bottom: 1px solid silver;
// `
const Wrapper = styled.div`
bottom: 0;
left: 0;
right: 0;
top: 10rem;
display: flex;
`
const HeaderArea = styled.div`
    right: 0;
    top: 0;
    left:0;
    border-bottom: 1px solid silver;
`

const Atag = styled.a`
  border: none;
  color:black;
`

const Navi =  styled.div`
  display: flex;
  justify-content: space-around;
  width:150px;
  height: 60px;
  position: relative
`
const buttun =  styled.button`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
`

/* const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  top:10rem;
` */

const Form = styled.div`
  font-size: 1rem;
  padding: 0.7rem;
  top: 0;
  right:0;
  width: 30%;
`
const Nyuryoku = styled.div`
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
  font-weight: bold;
`
const InputDate= styled.input`
  
`

const TextArea = styled.textarea`
  width:100%;
  height: 100px;
`

const AmountInput = styled.input`
  width: 29rem;
  padding: 0.5rem;
`
const MoneyArea = styled.div`
  display: fixed;
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


interface Props {
    text: string
    setText: (text: string) => void
  }
  

  export const Home: React.FC<Props> = (props) => {
    //メモ
    const { text, setText } = props
    //メモをlocalStorage への保存→カスタムフックへ移管
    /* const [text, setText] = useState<string>(localStorage.getItem(StorageKey) || '') */
    /* const [text, setText] = useStateWithStorage('', StorageKey) */
  
  //収入。支出
  //ラジオボタンリスト
  const [balance, setBalance] = useState('')
  const handleChange = (event) => {
    setBalance(event.target.value);
  };
  //日付
  const [date, setDate] = useState('')

  //カテゴリ
  const options = [
  { value: "食費", label: "食費" },
  { value: "趣味", label: "趣味" },
  { value: "交際費", label: "交際費" },
  { value: "家賃" , label: "家賃" },
  { value: "交通費", label: "交通費" },
];
const [category, setCategory] = useState(options[0]);


  //金額
  const [amount, setAmount] = useState('')
  
  
  //indexDB保存項目
  const saveMemo = (): void => {
      putMemo(balance, date,category,amount,text)
    }

  return (
    <>
    <HeaderArea>
          <Header title="Markdown Editor">
        <Navi>
          <button>ホーム</button>
          <button><Atag href = "http://localhost:8080/#/history">一覧</Atag>
          </button>
        </Navi>
      </Header>
      </HeaderArea>
      <Wrapper>
        <Calendar>
          <FullCalendar plugins={[dayGridPlugin]}/>
        </Calendar> 
        <Form>
            <InputSection>
              <InputSectiondiv>
              <Inputlabel>収支</Inputlabel>
                <div>
                <label>
                  <input
                  type="radio"
                  checked={balance === '支出'}
                  onChange={handleChange}
                  value = "支出"
                  />
                  支出
                </label>
                <label>
                  <input
                  type="radio"
                  checked={balance === '収入'}
                  onChange={handleChange}
                  value = "収入"
                  />
                  収入
                </label>
                </div>
                <Inputlabel>日付</Inputlabel>
                  <InputDate
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
                <Inputlabel>カテゴリ</Inputlabel>
                <Select
                    options = {options}
                    onChange={(value) => {
                  value ? setCategory(value) : null;
                    }}
                  />
              </InputSectiondiv>

              <InputSectiondiv>
              <Inputlabel>金額</Inputlabel>
              <MoneyArea>
                <AmountInput
                  type="number"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                />
                <div>円</div>
              </MoneyArea>
                  <Inputlabel>メモ</Inputlabel>
                    <TextArea
                      /* onChange={(event) => {
                      const changedText = event.target.value
                      localStorage.setItem(StorageKey, changedText) 
                      setText(changedText)
                    }} */
                    onChange={(event) => setText(event.target.value)}
                      value={text}
                    />
              </InputSectiondiv>

            </InputSection>
            <Button onClick={saveMemo}>
                保存する
            </Button>
        </Form>
        
      
      
      </Wrapper>

      
      
      
    </>
  )
}
