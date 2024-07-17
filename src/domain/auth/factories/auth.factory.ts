import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'
import { IEncrypter } from '../cryptography/encrypter'
import { HfTransactionContract } from '@/infra/contracts/hyperledger-fabric/hf-transaction-contract'
import { ITransactionContract } from '@/domain/transaction/blockchain/transaction-contract'
import { ITemporaryTransactionRepository } from '@/domain/transaction/repositories/temporary-transactions-repository'
import { InMemoryTemporaryTransactionRepository } from 'tests/repositories/in-memory-temporary-transaction-repository'
import { AuthService } from '../services/auth.service'
import { IAccountRepository } from '../repositories/account-repository'
import { MongooseAccountRepository } from '@/infra/database/mongoose/repositories/mongoose-account.repository'

export class AuthFactory {
  static services() {
    const encrypter: IEncrypter = new JwtEncrypter()
    const transactionContract: ITransactionContract =
      new HfTransactionContract()
    const accountRepository: IAccountRepository =
      new MongooseAccountRepository()

    const authService = new AuthService(
      encrypter,
      accountRepository,
      transactionContract
    )
    return authService
  }
}
