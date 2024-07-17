import { IAccountRepository } from '../repositories/account-repository'
import { AccountService } from '../services/account.service'
import { MongooseAccountRepository } from '@/infra/database/mongoose/repositories/mongoose-account.repository'

export class AccountFactory {
  static services() {
    const accountRepository: IAccountRepository =
      new MongooseAccountRepository()

    const accountService = new AccountService(accountRepository)
    return accountService
  }
}
