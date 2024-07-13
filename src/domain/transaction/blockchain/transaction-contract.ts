import { Transaction } from "../entities/transaction";

export interface ICreateTransactionRequest {
    payerId: string
    payeeId: string
    amount: number
}

export interface ITransactionContract {
    createTransaction(data: ICreateTransactionRequest): Promise<Transaction>
    getAllTransactionsByAccountId(accountId: string): Promise<Transaction[]>
}