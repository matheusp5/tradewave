import { BaseEntity } from "@/core/entities/base-entity";
import { Optional } from "@/core/types/optional";
import { generateId } from "@/core/utils/generate-id";
import { Account } from "@/domain/auth/entities/account";

export interface ITransactionProps {
    payerId: string
    payeeId: string
    amount: number
    createdAt: Date
    confirmedAt?: Date
}

export class Transaction extends BaseEntity<ITransactionProps> {
    get payerId(): string {
        return this.props.payerId
    }

    get payeeId(): string {
        return this.props.payeeId
    }

    get amount(): number {
        return this.props.amount
    }

    get createdAt(): Date {
        return this.props.createdAt
    }

    get confirmedAt(): Date | undefined {
        return this.props.confirmedAt
    }

    public static create(id: string, props: Optional<ITransactionProps, "createdAt">): Transaction {
        const transaction = new Transaction(id, {
            ...props,
            createdAt: new Date()
        })
        return transaction
    }
}