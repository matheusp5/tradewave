import { ITransactionContract } from "@/domain/transaction/blockchain/transaction-contract";
import { ICreateBlockchainTransactionRequest } from "@/domain/transaction/dto/transaction.dto";
import { Transaction } from "@/domain/transaction/entities/transaction";

export class HfTransactionContract implements ITransactionContract {
    async createTransaction(data: ICreateBlockchainTransactionRequest): Promise<Transaction> {
        console.log("Creating transaction on Hyperledger Fabric");

        const transaction = Transaction.create(data.id, data)
        return transaction
    }

    async getAllTransactionsByAccountId(accountId: string): Promise<Transaction[]> {
        console.log("Getting all transactions by account id on Hyperledger Fabric");
        return []
    }
}