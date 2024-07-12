import { ICreateAccountDTO } from "../dtos/account.dto";
import { Account } from "../entities/account";

export interface IAccountRepository {
    getAll(): Promise<Account[]>
    getById(id: string): Promise<Account>
    getByEmail(email: string): Promise<Account>
    getByUsername(username: string): Promise<Account>
    create(account: ICreateAccountDTO): Promise<Account>
    deleteById(id: string): Promise<void>
    updateById(id: string, account: ICreateAccountDTO): Promise<Account>
}