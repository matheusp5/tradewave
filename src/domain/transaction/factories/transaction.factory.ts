import { InMemoryTemporaryTransactionRepository } from 'tests/repositories/in-memory-temporary-transaction-repository'
import { ITemporaryTransactionRepository } from '../repositories/temporary-transactions-repository'
import { ITransactionContract } from '../blockchain/transaction-contract'
import { HfTransactionContract } from '@/infra/contracts/hyperledger-fabric/hf-transaction-contract'
import { TransactionService } from '../services/transaction.service'
import { InMemoryAccountRepository } from 'tests/repositories/in-memory-account-repository'
import { IAccountRepository } from '@/domain/auth/repositories/account-repository'
import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'
import { IEncrypter } from '@/domain/auth/cryptography/encrypter'

export class TransactionFactory {
  static services() {
    const temporaryTransactionRepository: ITemporaryTransactionRepository =
      new InMemoryTemporaryTransactionRepository()
    const transactionContract: ITransactionContract =
      new HfTransactionContract()
    const accountRepository: IAccountRepository =
      new InMemoryAccountRepository()
    const encrypter: IEncrypter = new JwtEncrypter()

    const transactionService = new TransactionService(
      transactionContract,
      temporaryTransactionRepository,
      accountRepository,
      encrypter
    )
    return transactionService
  }
}
