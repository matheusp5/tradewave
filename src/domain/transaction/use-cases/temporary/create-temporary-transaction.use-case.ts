import { IUseCase } from "@/core/types/use-case";
import { ITemporaryTransactionRepository } from "../../repositories/temporary-transactions-repository";
import { Transaction } from "../../entities/transaction";
import { generateId } from "@/core/utils/generate-id";

interface ICreateTemporaryTransactionUseCaseRequest {
    payerId: string
    payeeId: string
    amount: number
}

interface ICreateTemporaryTransactionUseCaseResponse {
    transaction: Transaction
}

export class CreateTemporaryTransactionUseCase implements IUseCase<ICreateTemporaryTransactionUseCaseRequest, Promise<ICreateTemporaryTransactionUseCaseResponse>> {
    constructor(private temporaryTransactionRepository: ITemporaryTransactionRepository) { }

    async execute(request: ICreateTemporaryTransactionUseCaseRequest): Promise<ICreateTemporaryTransactionUseCaseResponse> {
        const transaction = await this.temporaryTransactionRepository.createTemporaryTransaction({
            id: generateId(),
            createdAt: new Date(),

            ...request,
        });

        return { transaction };
    }
}