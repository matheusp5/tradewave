import { Transaction } from "@/domain/transaction/entities/transaction";

export class TransactionMapper {
    static toPersistence(transaction: Transaction) {
        return {
            id: transaction.id,
            payerId: transaction.payerId,
            payeeId: transaction.payeeId,
            amount: transaction.amount,
            createdAt: transaction.createdAt,
            verifiedAt: transaction.confirmedAt
        }
    }

    static toDomain(data: any): Transaction {
        return Transaction.create(data.id, {
            payerId: data.payerId,
            payeeId: data.payeeId,
            amount: data.amount,
            createdAt: data.createdAt,
            confirmedAt: data.verifiedAt
        })
    }
}