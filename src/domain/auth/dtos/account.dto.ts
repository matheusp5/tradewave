import { Account } from '../entities/account'
import { Password } from '../entities/value-objects/password'

export interface ICreateAccountRequest {
  firstName: string
  lastName: string
  username: string
  email: string
  password: Password
}

export interface IShowAccountByEmailDTO {
  email: string
}

export interface IShowAccountByUsernameDTO {
  username: string
}

export interface IShowAccountByIdDTO {
  id: string
}

export interface IDeleteAccountDTO {
  requester: Account
}
