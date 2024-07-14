import { ICreateTemporaryTransactionRequest } from '../dto/transaction.dto'
import { Transaction } from '../entities/transaction'

export interface ITemporaryTransactionRepository {
  createTemporaryTransaction(
    data: ICreateTemporaryTransactionRequest
  ): Promise<Transaction>
  getTemporaryTransactionById(
    transactionId: string
  ): Promise<Transaction | null>
  getAllTemporaryTransactionsByAccountId(
    accountId: string
  ): Promise<Transaction[]>
  deleteTemporaryTransactionById(transactionId: string): Promise<void>
}
