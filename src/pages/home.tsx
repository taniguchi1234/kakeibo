import * as React from 'react'
import styled from 'styled-components'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Header = styled.header`
  font-size: 1.5rem;
  height: 2rem;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
`

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 10rem;
`

const TextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  font-size: 1rem;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  right: 0;
`

  const  Calendar= styled.div`
    border-top: 1px solid silver;
    bottom: 0;
    overflow-y: scroll;
    padding: 1rem;
    width: 50vw;
    top: 0;
    left:0;
`

export const Home: React.FC = () => {
  return (
    <>
      <Header>
      <h1>MyMoney</h1>
            <button>ホーム</button>
            <button>入出金一覧</button>
            <button>グラフ</button>
            
      </Header>
      <Wrapper>
        <Calendar>
          <FullCalendar plugins={[dayGridPlugin]}/>
        </Calendar>
        <TextArea>
          あいう
        </TextArea>
      </Wrapper>

      
    </>
  )
}
