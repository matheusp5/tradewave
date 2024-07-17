import {ITemporaryTransactionRepository} from '../repositories/temporary-transactions-repository'
import {ITransactionContract} from '../blockchain/transaction-contract'
import {TransactionService} from '../services/transaction.service'
import {IAccountRepository} from '@/domain/auth/repositories/account-repository'
import {JwtEncrypter} from '@/infra/cryptography/jwt-encrypter'
import {IEncrypter} from '@/domain/auth/cryptography/encrypter'
import {LocalTransactionContract} from '@/infra/blockchain/contracts/array-transaction-contract'
import {
  SQLiteTransactionBlockchainRepository
} from '@/infra/blockchain/repositories/sqlite-transaction-blockchain-repository'
import {ITransactionBlockchainRepository} from '../repositories/transaction-blockchain-repository'
import {MongooseAccountRepository} from '@/infra/database/mongoose/repositories/mongoose-account.repository'
import {
  MongooseTemporaryTransactionRepository
} from '@/infra/database/mongoose/repositories/mongoose-temporary-transaction.repository'

export class TransactionFactory {
  static async services() {
    const temporaryTransactionRepository: ITemporaryTransactionRepository =
      new MongooseTemporaryTransactionRepository()
    const blockchainRepository: ITransactionBlockchainRepository = new SQLiteTransactionBlockchainRepository();
    await blockchainRepository.initialize()
    const transactionContract: ITransactionContract =
      new LocalTransactionContract(blockchainRepository)
    const accountRepository: IAccountRepository =
      new MongooseAccountRepository()
    const encrypter: IEncrypter = new JwtEncrypter()

    return new TransactionService(
      transactionContract,
      temporaryTransactionRepository,
      accountRepository,
      encrypter
    )
  }
}
