import { ITransactionContract } from "@/domain/transaction/blockchain/transaction-contract";
import { ICreateBlockchainTransactionRequest } from "@/domain/transaction/dto/transaction.dto";
import { Transaction } from "@/domain/transaction/entities/transaction";
import { generateId } from "@/core/utils/generate-id";
import { generateHash, IBlock, ITransactionBlockchainRepository } from "@/domain/transaction/repositories/transaction-blockchain-repository";
import { TransactionMapper } from "../mappers/transaction-mapper";

export class LocalTransactionContract implements ITransactionContract {
    constructor(
        private blockchainRepository: ITransactionBlockchainRepository
    ) { }

    async createTransaction(data: ICreateBlockchainTransactionRequest): Promise<Transaction> {
        const transaction = Transaction.create(generateId(), {
            payerId: data.payerId,
            payeeId: data.payeeId,
            amount: data.amount,
            createdAt: data.createdAt,
            confirmedAt: data.verifiedAt
        });

        const lastBlock = await this.blockchainRepository.getLastBlock();

        const newBlock: IBlock = {
            data: JSON.stringify(TransactionMapper.toPersistence(transaction)),
            previousHash: lastBlock.hash,
            hash: generateHash(JSON.stringify(TransactionMapper.toPersistence(transaction)) + lastBlock.hash)
        };

        await this.blockchainRepository.addBlock(newBlock);

        return transaction;
    }

    async getAllTransactionsByAccountId(accountId: string): Promise<Transaction[]> {
        const blocks = await this.blockchainRepository.getAllBlocks();
        const transactions: Transaction[] = [];

        for (const block of blocks) {
            const data = block.data;
            if (data !== "genesis") {
                const transaction = TransactionMapper.toDomain(JSON.parse(data));
                if (transaction.payerId === accountId || transaction.payeeId === accountId) {
                    transactions.push(transaction);
                }
            }
        }

        return transactions;
    }
}
