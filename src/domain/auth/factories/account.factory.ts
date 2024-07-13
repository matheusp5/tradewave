import { IAccountRepository } from "../repositories/account-repository"
import { InMemoryAccountRepository } from "tests/repositories/in-memory-account-repository"
import { AccountService } from "../services/account.service"

export class AccountFactory {
    static services() {
        const accountRepository: IAccountRepository = new InMemoryAccountRepository()

        const accountService = new AccountService(accountRepository)
        return accountService
    }
}