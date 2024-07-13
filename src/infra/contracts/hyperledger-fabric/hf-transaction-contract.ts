import { ICreateTransactionRequest, ITransactionContract } from "@/domain/transaction/blockchain/transaction-contract";
import { Transaction } from "@/domain/transaction/entities/transaction";

export class HfTransactionContract implements ITransactionContract {
    async createTransaction(data: ICreateTransactionRequest): Promise<Transaction> {
        console.log("Creating transaction on Hyperledger Fabric");
        const transaction = Transaction.create({
            amount: data.amount,
            createdAt: data.createdAt,
            payeeId: data.payeeId,
            payerId: data.payerId,
            confirmedAt: data.verifiedAt,
        }, data.id)

        return transaction
    }

    async getAllTransactionsByAccountId(accountId: string): Promise<Transaction[]> {
        console.log("Getting all transactions by account id on Hyperledger Fabric");
        return []
    }
}