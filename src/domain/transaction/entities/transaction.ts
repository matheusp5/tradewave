import { BaseEntity } from "@/core/entities/base-entity";
import { Account } from "@/domain/auth/entities/account";

export interface ITransactionProps {
    payer: Account
    payee: Account
    amount: number
    createdAt: Date
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

    private constructor(props: ITransactionProps, id: string) {
        super(id, props)
    }

    public static create(props: ITransactionProps, id: string): Transaction {
        const transaction = new Transaction(props, id)
        return transaction
    }
}