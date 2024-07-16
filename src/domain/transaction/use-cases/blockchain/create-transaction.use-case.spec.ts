import { CreateTransactionUseCase } from './create-transaction.use-case'
import { ITransactionContract } from '../../blockchain/transaction-contract'
import { makeTransaction } from 'tests/factories/make-transaction'
import { generateId } from '@/core/utils/generate-id'
import { SQLiteTransactionBlockchainRepository } from '@/infra/blockchain/repositories/sqlite-transaction-blockchain-repository'
import { LocalTransactionContract } from '@/infra/blockchain/contracts/array-transaction-contract'
import { ITransactionBlockchainRepository } from '../../repositories/transaction-blockchain-repository'

describe('Create Transaction (Blockchain) Use Case', () => {
  let sut: CreateTransactionUseCase
  let blockchainRepository: ITransactionBlockchainRepository
  let transactionContract: ITransactionContract

  beforeEach(async () => {
    blockchainRepository = new SQLiteTransactionBlockchainRepository();
    transactionContract = new LocalTransactionContract(blockchainRepository)
    sut = new CreateTransactionUseCase(transactionContract)
  })

  it('should create a transaction', async () => {
    const transactionPayload = makeTransaction({
      amount: 200
    })

    const { transaction } = await sut.execute({
      id: generateId(),
      ...transactionPayload,
      verifiedAt: new Date()
    })

    expect(transaction.payerId).toBe(transactionPayload.payerId)
    expect(transaction.payeeId).toBe(transactionPayload.payeeId)
  })
})
