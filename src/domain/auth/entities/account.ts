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
  updatedAt: Date
}

export class Account extends BaseEntity<IAccountProps> {
  private touch() {
    this.props.updatedAt = new Date()
  }

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

  get updatedAt() {
    return this.props.updatedAt
  }

  rename({ firstName, lastName }: { firstName?: string; lastName?: string }) {
    // preventing to set some property to undefined
    this.props.firstName = firstName ?? this.firstName
    this.props.lastName = lastName ?? this.lastName
    this.touch()
  }

  changePassword(password: Password) {
    this.props.password = password
    this.touch()
  }

  changeLastName(lastName: string) {
    this.props.lastName = lastName
    this.touch()
  }

  changeUsername(username: string) {
    this.props.username = username
    this.touch()
  }

  changeEmail(email: string) {
    this.props.email = email
    this.touch()
  }

  static create(
    props: Optional<IAccountProps, 'createdAt' | 'updatedAt'>,
    id?: string
  ) {
    const account = new Account(id ?? generateId(), {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date()
    })

    return account
  }
}
