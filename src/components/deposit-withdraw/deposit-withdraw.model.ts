import { Dayjs } from 'dayjs';
export interface BankDetail {
  bankName: string
  bankNumber: string
}

export interface Transaction {
  accountId: string | null
  amount: number
  type: string
  transactionTime: Dayjs;
}