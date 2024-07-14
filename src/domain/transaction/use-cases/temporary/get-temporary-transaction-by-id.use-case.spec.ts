import { InMemoryTemporaryTransactionRepository } from "tests/repositories/in-memory-temporary-transaction-repository";
import { ITemporaryTransactionRepository } from "../../repositories/temporary-transactions-repository";
import { GetTemporaryTransactionByIdUseCase } from "./get-temporary-transaction-by-id.use-case";
import { makeTransaction } from "tests/factories/make-transaction";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.error";

describe('Get Temporary Transaction By Id Use Case', () => {
    let sut: GetTemporaryTransactionByIdUseCase;
    let temporaryTransactionRepository: ITemporaryTransactionRepository;

    beforeEach(() => {
        temporaryTransactionRepository = new InMemoryTemporaryTransactionRepository();
        sut = new GetTemporaryTransactionByIdUseCase(temporaryTransactionRepository);
    });

    it('should return the temporary transaction when it exists', async () => {
        const transactionPayload = makeTransaction();
        const createdTransaction = await temporaryTransactionRepository.createTemporaryTransaction(transactionPayload);

        const { transaction } = await sut.execute({ transactionId: createdTransaction.id });

        expect(transaction.id).toEqual(createdTransaction.id);
        expect(transaction.payerId).toEqual(createdTransaction.payerId);
        expect(transaction.payeeId).toEqual(createdTransaction.payeeId);
    });

    it('should throw a ResourceNotFoundError when the temporary transaction does not exist', async () => {
        const transactionId = '123';

        await expect(sut.execute({ transactionId })).rejects.toThrow(ResourceNotFoundError);
    });
});