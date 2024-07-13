import { IUseCase } from "@/core/types/use-case";
import { ITemporaryTransactionRepository } from "../../repositories/temporary-transactions-repository";
import { ICreateTransactionRequest } from "../../blockchain/transaction-contract";
import { Transaction } from "../../entities/transaction";
import { generateId } from "@/core/utils/generate-id";

interface CreateTemporaryTransactionUseCaseRequest {
    payerId: string
    payeeId: string
    amount: number
}

interface CreateTemporaryTransactionUseCaseResponse {
    transaction: Transaction
}

export class CreateTemporaryTransactionUseCase implements IUseCase<CreateTemporaryTransactionUseCaseRequest, Promise<CreateTemporaryTransactionUseCaseResponse>> {
    constructor(private temporaryTransactionRepository: ITemporaryTransactionRepository) { }

    async execute(request: CreateTemporaryTransactionUseCaseRequest): Promise<CreateTemporaryTransactionUseCaseResponse> {
        const transaction = await this.temporaryTransactionRepository.createTemporaryTransaction({
            id: generateId(),
            createdAt: new Date(),

            ...request,
        });

        return { transaction };
    }
}