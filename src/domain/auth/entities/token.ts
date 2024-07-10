import { BaseEntity } from '@/core/entities/base-entity'
import { Account } from './account'
import { Optional } from '@/core/types/optional'

export interface ITokenProps {
    token: string
    account: Account
    createdAt: Date
    updatedAt: Date
}

export class Token extends BaseEntity<ITokenProps> {
    private touch() {
        this.props.updatedAt = new Date()
    }

    get token() {
        return this.props.token
    }

    get account() {
        return this.props.account
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    changeToken(token: string) {
        this.props.token = token
        this.touch()
    }

    changeAccount(account: Account) {
        this.props.account = account
        this.touch()
    }

    static create(
        props: Optional<ITokenProps, 'createdAt' | 'updatedAt'>,
        id: string
    ) {
        const token = new Token(id, {
            ...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date()
        })

        return token
    }
}
