import { HfTransactionContract } from "@/infra/contracts/hyperledger-fabric/hf-transaction-contract";
import { ITransactionContract } from "../../blockchain/transaction-contract";
import { GetAccountBalanceUseCase } from "./get-account-balance.use-case";
import { makeTransaction } from "tests/factories/make-transaction";
import { generateId } from "@/core/utils/generate-id";

describe("Get Account Balance Use Case", () => {
    let sut: GetAccountBalanceUseCase;
    let transactionContract: ITransactionContract;

    beforeEach(() => {
        transactionContract = new HfTransactionContract()
        sut = new GetAccountBalanceUseCase(transactionContract);
    });

    it("should calculate the account balance correctly when there are transactions", async () => {
        const accountId = "testAccountId";
        const transactions = [
            makeTransaction({ amount: 100 }),
            makeTransaction({ payeeId: accountId, amount: 200 }),
            makeTransaction({ payerId: accountId, amount: 75 }),
            makeTransaction({ amount: 75 }),
            makeTransaction({ payerId: accountId, amount: 75 }),
        ];
        await Promise.all(transactions.map(transaction => transactionContract.createTransaction({ ...transaction, id: generateId(), verifiedAt: new Date() })));

        const result = await sut.execute({ accountId });

        expect(result.transactionsNumber).toBe(3);
        expect(result.balance).toBe(50); // 200 - 75 - 75 
    });

    it("should return 0 balance when there are no transactions", async () => {
        const accountId = "wrong-id";

        const result = await sut.execute({ accountId });

        expect(result.transactionsNumber).toBe(0);
        expect(result.balance).toBe(0);
    });
});