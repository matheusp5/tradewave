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
    get payer(): string {
        return this.props.payerId
    }

    get payee(): string {
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

    private constructor(props: ITransactionProps, id: string) {
        super(id, props)
    }

    public static create(props: Optional<ITransactionProps, "createdAt">, id?: string): Transaction {
        const transaction = new Transaction({
            ...props,
            createdAt: new Date()
        }, id ?? generateId())
        return transaction
    }
}