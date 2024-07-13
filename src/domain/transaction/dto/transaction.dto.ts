export interface ICreateBlockchainTransactionRequest {
    id: string
    payerId: string
    payeeId: string
    amount: number
    createdAt: Date
    verifiedAt: Date
}

export interface ICreateTemporaryTransactionRequest {
    id: string
    payerId: string
    payeeId: string
    amount: number
    createdAt: Date
}

export interface ICreateTransactionDTO {
    email: string
    amount: number
}
