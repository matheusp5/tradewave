import { ICreateBlockchainTransactionRequest } from '../dto/transaction.dto'
import { Transaction } from '../entities/transaction'

export interface ITransactionContract {
  createTransaction(data: ICreateBlockchainTransactionRequest): Promise<Transaction>
  getAllTransactionsByAccountId(accountId: string): Promise<Transaction[]>
}
