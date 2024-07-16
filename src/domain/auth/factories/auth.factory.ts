import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'
import { IEncrypter } from '../cryptography/encrypter'
import { ITransactionContract } from '@/domain/transaction/blockchain/transaction-contract'
import { AuthService } from '../services/auth.service'
import { InMemoryAccountRepository } from 'tests/repositories/in-memory-account-repository'
import { IAccountRepository } from '../repositories/account-repository'
import { LocalTransactionContract } from '@/infra/blockchain/contracts/array-transaction-contract'
import { SQLiteTransactionBlockchainRepository } from '@/infra/blockchain/repositories/sqlite-transaction-blockchain-repository'
import { ITransactionBlockchainRepository } from '@/domain/transaction/repositories/transaction-blockchain-repository'

export class AuthFactory {
  static services() {
    const encrypter: IEncrypter = new JwtEncrypter()
    const blockchainRepository: ITransactionBlockchainRepository = new SQLiteTransactionBlockchainRepository()
    const transactionContract: ITransactionContract =
      new LocalTransactionContract(blockchainRepository)
    const accountRepository: IAccountRepository =
      new InMemoryAccountRepository()

    const authService = new AuthService(
      encrypter,
      accountRepository,
      transactionContract
    )
    return authService
  }
}
