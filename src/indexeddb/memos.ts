import Dexie from 'dexie'

export interface MemoRecord {
  balance:string
  date: string
  category: { value: string; label: string; }
  amount:string
  memo: string
  datetime:string
}

const database = new Dexie('my-money')
database.version(1).stores({ memos: '&datetime' })
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')

//登録
export const putMemo 
    = async (balance:string, date:string,category:{ value: string; label: string; },amount:string,memo:string): Promise<void> => {
  const datetime = new Date().toISOString()
  await memos.put({ datetime, balance, date, category,amount,memo})
}
//取得
export const getMemos = (): Promise<MemoRecord[]> => {
  return memos.orderBy('datetime')
  .reverse()
  .toArray()
}

