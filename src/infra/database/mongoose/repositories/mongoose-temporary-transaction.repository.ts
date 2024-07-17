import { ICreateTemporaryTransactionRequest } from "@/domain/transaction/dto/transaction.dto";
import { Transaction } from "@/domain/transaction/entities/transaction";
import { ITemporaryTransactionRepository } from "@/domain/transaction/repositories/temporary-transactions-repository";
import { TemporaryTransacionModel } from "../schemas/temporary-transaction.schema";
import { MongooseTemporaryTransactionMapper } from "../mapper/mongoose-temporary-transaction.mapper";

export class MongooseTemporaryTransactionRepository implements ITemporaryTransactionRepository {
    async createTemporaryTransaction(data: ICreateTemporaryTransactionRequest): Promise<Transaction> {
        const createdTransaction = await TemporaryTransacionModel.create(data);
        return MongooseTemporaryTransactionMapper.toDomain(createdTransaction);
    }

    async getTemporaryTransactionById(transactionId: string): Promise<Transaction | null> {
        const transaction = await TemporaryTransacionModel.findById(transactionId);
        return transaction ? MongooseTemporaryTransactionMapper.toDomain(transaction) : null;
    }

    async getAllTemporaryTransactionsByAccountId(accountId: string): Promise<Transaction[]> {
        const transactions = await TemporaryTransacionModel.find({ accountId });
        return transactions.map(transaction => MongooseTemporaryTransactionMapper.toDomain(transaction));
    }

    async deleteTemporaryTransactionById(transactionId: string): Promise<void> {
        await TemporaryTransacionModel.findByIdAndDelete(transactionId);
    }
}