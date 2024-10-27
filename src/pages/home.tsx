import * as React from 'react'
import styled from 'styled-components'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import { EventContentArg } from '@fullcalendar/react';
import { putMemo } from '../indexeddb/memos'
import { Button } from '../components/button';
import Select from 'react-select'
import { Link } from 'react-router-dom'
import { Header } from '../components/header'
import { useStateWithStorage } from '../hooks/use_state_with_storage'
import {
  getMemoPageCount,
  getMemos,
  MemoRecord,
} from '../indexeddb/memos'


const {useState, useEffect } = React
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
const Balance = styled.div`
    font-size: 1rem;
    margin-bottom: 0.5rem;
  `
  
  const Datesel = styled.div`
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


interface Props {
    text: string
    setText: (text: string) => void
    amount: string
    setAmount: (amount: string) => void
    date: string
    setDate: (date: string) => void
    datetime:string
    setDatetime:(datetime: string) => void
  }
  

  export const Home: React.FC<Props> = (props) => {
    //メモ
    const { text, setText } = props
    //料金
    const { amount, setAmount } = props
    //日付
    const { date, setDate } = props

  
  //収入。支出
  //ラジオボタンリスト
  const [balance, setBalance] = useState('')
  const handleChange = (event) => {
    setBalance(event.target.value);
  };


  //カテゴリ
  const options = [
  { value: "食費", label: "食費" },
  { value: "趣味", label: "趣味" },
  { value: "交際費", label: "交際費" },
  { value: "家賃" , label: "家賃" },
  { value: "交通費", label: "交通費" },
];
const [category, setCategory] = useState(options[0]);

  //indexDB保存項目
  const saveMemo = (): void => {
      putMemo(balance, date,category,amount,text)
  }
  /* //indexDB削除
  const deleteMemo = (datetime:string): void => {
      deleteMemo(datetime)
  }
 */

  //今月取得
  const thisMonth = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}`;
};

//計算
const [memos, setMemos] = useState<MemoRecord[]>([])
    useEffect(() => {
      getMemos(memos.length).then(setMemos)
    }, [])
let total :number = 0;
let mainasu :number = 0;
let plus :number = 0;



for (let i = 0; i < memos.length; i += 1) {
  let subDate = memos[i].date.slice(0, 7);
  if(subDate === thisMonth()){
    if (memos[i].balance === '収入'){
      plus += Number(memos[i].amount);
      total += Number(memos[i].amount);
    }else{
      mainasu += Number(memos[i].amount);
      total -= Number(memos[i].amount);
    }
  }
}

const calenderMap = memos.map( memo => {
    return {
            date: memo.date,
            title: memo.amount,
            backgroundcolor:(memo.category.value === "支出")?"red" :"blue"
    };
  });


  return (
    <>
    <HeaderArea>
          <Header title="My Money">
        <Navi>
          <button><Atag href = "http://localhost:8080/#/history">一覧</Atag>
          </button>
        </Navi>
      </Header>
      </HeaderArea>
      <Wrapper>
        <Calendar>
        <FullCalendar  
        events={calenderMap}
        plugins={[dayGridPlugin]}/>
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
                    onChange={(event) => setText(event.target.value)}
                      value={text}
                    />
              </InputSectiondiv>
            </InputSection>
            <button onClick={saveMemo}><Atag href = "http://localhost:8080/#/history">保存する</Atag></button>
            <div>
              {thisMonth()}
              収入:{plus}- 支出{mainasu} = 合計:{total}円
            </div>
        </Form>
      </Wrapper>
    </>
  )
}
