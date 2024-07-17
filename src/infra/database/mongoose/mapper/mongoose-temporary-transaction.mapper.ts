import { Transaction } from "@/domain/transaction/entities/transaction";
import { TemporaryTransactionSchemaType } from "../schemas/temporary-transaction.schema";

export class MongooseTemporaryTransactionMapper {
    static toDomain(temporaryTransaction: TemporaryTransactionSchemaType) {
        return Transaction.create(temporaryTransaction.id, {
            payerId: temporaryTransaction.payerId,
            payeeId: temporaryTransaction.payeeId,
            amount: temporaryTransaction.amount,
            createdAt: temporaryTransaction.createdAt
        })
    }

    static toPersistence(temporaryTransaction: Transaction): TemporaryTransactionSchemaType {
        return {
            id: temporaryTransaction.id,
            payerId: temporaryTransaction.payerId,
            payeeId: temporaryTransaction.payeeId,
            amount: temporaryTransaction.amount,
            createdAt: temporaryTransaction.createdAt
        }
    }
}