import { Account } from '@/domain/auth/entities/account'

export class AccountPresenter {
  static toHttp(account: Account) {
    return {
      id: account.id,
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      createdAt: account.createdAt
    }
  }
}
