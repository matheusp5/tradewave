import { Account } from "@/domain/auth/entities/account"

export interface ICreateBlockchainTransactionRequest {
    id: string
    payerId: string
    payeeId: string
    amount: number
    createdAt: Date
    verifiedAt: Date
}

export interface ICreateTemporaryTransactionRequest {
    payerId: string
    payeeId: string
    amount: number
    createdAt: Date
}

export interface ICreateTransactionDTO {
    email: string
    amount: number
}

export interface IConfirmTransactionDTO {
    token: string
    requester: Account
}

export interface IMyTransactionsDTO {
    requester: Account
}