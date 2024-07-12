import { Password } from "../entities/value-objects/password"

export interface ICreateAccountDTO {
    firstName: string
    lastName: string
    username: string
    email: string
    password: Password
}

export interface IUpdateAccountDTO {
    firstName?: string
    lastName?: string
    username?: string
    email?: string
    password?: string
}