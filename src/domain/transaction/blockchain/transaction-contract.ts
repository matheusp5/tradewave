import { Transaction } from "../entities/transaction";

export interface ICreateTransactionRequest {
    payer: string
    payee: string
    amount: number
}

export interface IGetAllTransactionsRequest {
    accountId: string
}


export interface ITransactionContract {
    createTransaction(data: ICreateTransactionRequest): Promise<Transaction>
    getAllTransactionsByAccountId(data: IGetAllTransactionsRequest): Promise<Transaction[]>
}