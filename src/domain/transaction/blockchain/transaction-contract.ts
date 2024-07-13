import { ITransactionProps, Transaction } from "../entities/transaction";

export interface ICreateTransactionRequest {
    id: string
    payerId: string
    payeeId: string
    amount: number
    createdAt: Date
    verifiedAt: Date
}

export interface ITransactionContract {
    createTransaction(data: ICreateTransactionRequest): Promise<Transaction>
    getAllTransactionsByAccountId(accountId: string): Promise<Transaction[]>
}