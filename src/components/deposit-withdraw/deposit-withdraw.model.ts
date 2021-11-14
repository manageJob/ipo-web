import { Dayjs } from 'dayjs';
export interface BankDetail {
  bankName: string
  bankNumber: string
}

export interface Transaction {
  accountId: string | null
  userId: string | null
  amount: number
  type: string
  transactionTime: Dayjs;
}
export interface TransactionDetail {
  amount: number
  type: string
  status: string
  transactionTime: Dayjs;
}