import { BaseEntity } from "@/core/entities/base-entity";
import { Optional } from "@/core/types/optional";
import { Account } from "@/domain/auth/entities/account";

export interface ITransactionProps {
    payer: Account
    payee: Account
    amount: number
    createdAt: Date
    confirmedAt?: Date
}

export class Transaction extends BaseEntity<ITransactionProps> {
    get payer(): Account {
        return this.props.payer
    }

    get payee(): Account {
        return this.props.payee
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

    public static create(props: Optional<ITransactionProps, "createdAt">, id: string): Transaction {
        const transaction = new Transaction({
            ...props,
            createdAt: new Date()
        }, id)
        return transaction
    }
}