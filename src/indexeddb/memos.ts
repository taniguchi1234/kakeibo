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
//総数
const NUM_PER_PAGE: number = 10
  
export const getMemoPageCount = async (): Promise<number> => {
  const totalCount = await memos.count()
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE)
  return pageCount > 0 ? pageCount : 1
}


//取得
export const getMemos = (page: number): Promise<MemoRecord[]> => {
  const offset = (page - 1) * NUM_PER_PAGE
  return memos.orderBy('datetime')
              .reverse()
              .offset(offset)
              .limit(NUM_PER_PAGE)
              .toArray()
}
