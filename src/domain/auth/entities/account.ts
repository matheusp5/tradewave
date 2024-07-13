import { BaseEntity } from '@/core/entities/base-entity'
import { Optional } from '@/core/types/optional'
import { Password } from './value-objects/password'
import { generateId } from '@/core/utils/generate-id'

export interface IAccountProps {
  firstName: string
  lastName: string
  username: string
  email: string
  password: Password
  createdAt: Date
}

export class Account extends BaseEntity<IAccountProps> {
  get firstName() {
    return this.props.firstName
  }

  get password() {
    return this.props.password
  }

  get lastName() {
    return this.props.lastName
  }

  get username() {
    return this.props.username
  }

  get email() {
    return this.props.email
  }

  get createdAt() {
    return this.props.createdAt
  }

  rename({ firstName, lastName }: { firstName?: string; lastName?: string }) {
    // preventing to set some property to undefined
    this.props.firstName = firstName ?? this.firstName
    this.props.lastName = lastName ?? this.lastName
  }

  changePassword(password: Password) {
    this.props.password = password
  }

  changeLastName(lastName: string) {
    this.props.lastName = lastName
  }

  changeUsername(username: string) {
    this.props.username = username
  }

  changeEmail(email: string) {
    this.props.email = email
  }

  static create(
    id: string,
    props: Optional<IAccountProps, 'createdAt'>
  ) {
    const account = new Account(id, {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    })

    return account
  }
}
