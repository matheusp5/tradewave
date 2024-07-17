import { InMemoryTemporaryTransactionRepository } from 'tests/repositories/in-memory-temporary-transaction-repository'
import { ITemporaryTransactionRepository } from '../repositories/temporary-transactions-repository'
import { ITransactionContract } from '../blockchain/transaction-contract'
import { TransactionService } from '../services/transaction.service'
import { InMemoryAccountRepository } from 'tests/repositories/in-memory-account-repository'
import { IAccountRepository } from '@/domain/auth/repositories/account-repository'
import { JwtEncrypter } from '@/infra/cryptography/jwt-encrypter'
import { IEncrypter } from '@/domain/auth/cryptography/encrypter'
import { LocalTransactionContract } from '@/infra/blockchain/contracts/array-transaction-contract'
import { SQLiteTransactionBlockchainRepository } from '@/infra/blockchain/repositories/sqlite-transaction-blockchain-repository'
import { ITransactionBlockchainRepository } from '../repositories/transaction-blockchain-repository'
import { MongooseAccountRepository } from '@/infra/database/mongoose/repositories/mongoose-account.repository'

export class TransactionFactory {
  static async services() {
    const temporaryTransactionRepository: ITemporaryTransactionRepository =
      new InMemoryTemporaryTransactionRepository()
    const blockchainRepository: ITransactionBlockchainRepository = new SQLiteTransactionBlockchainRepository();
    await blockchainRepository.initialize()
    const transactionContract: ITransactionContract =
      new LocalTransactionContract(blockchainRepository)
    const accountRepository: IAccountRepository =
      new MongooseAccountRepository()
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
