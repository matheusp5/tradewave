import { IUseCase } from '@/core/types/use-case'
import { Account } from '../../entities/account'
import { IAccountRepository } from '../../repositories/account-repository'

interface IGetAccountsUseCaseResponse {
  accounts: Account[]
}

export class GetAccountsUseCase
  implements IUseCase<{}, Promise<IGetAccountsUseCaseResponse>>
{
  constructor(private accountRepository: IAccountRepository) {}

  async execute(): Promise<IGetAccountsUseCaseResponse> {
    const accounts = await this.accountRepository.getAll()
    return { accounts }
  }
}
