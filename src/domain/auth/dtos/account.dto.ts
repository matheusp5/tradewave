export interface ICreateAccountDTO {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
}

export interface IUpdateAccountDTO {
    firstName?: string
    lastName?: string
    username?: string
    email?: string
    password?: string
}