import Dexie from 'dexie'

export interface MemoRecord {
  balance:string
  date: string
  category: string
  amount:string
  memo: string
  datetime:string
}

const database = new Dexie('my-money')
database.version(1).stores({ memos: '&datetime' })
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')

export const putMemo 
    = async (balance:string, date: string,category: string,amount:string,memo: string): Promise<void> => {
  const datetime = new Date().toISOString()
  await memos.put({ datetime, balance, date, category,amount,memo})
}
