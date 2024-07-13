import { IUseCase } from "@/core/types/use-case";
import { Transaction } from "../../entities/transaction";
import { ITransactionContract } from "../../blockchain/transaction-contract";
import moment from "moment";

interface ICreateBlockchainTransactionUseCaseRequest {
    id: string
    payerId: string
    payeeId: string
    amount: number
    createdAt: Date
    verifiedAt: Date
}

interface ICreateBlockchainTransactionUseCaseResponse {
    transaction: Transaction
}

export class CreateTransactionUseCase implements IUseCase<ICreateBlockchainTransactionUseCaseRequest, Promise<ICreateBlockchainTransactionUseCaseResponse>> {
    constructor(
        private transactionContract: ITransactionContract
    ) { }

    async execute(request: ICreateBlockchainTransactionUseCaseRequest): Promise<ICreateBlockchainTransactionUseCaseResponse> {
        const transaction = await this.transactionContract.createTransaction(request)
        return { transaction }
    }
}