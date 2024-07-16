import { ITransactionContract } from '../../blockchain/transaction-contract'
import { GetAccountBalanceUseCase } from './get-account-balance.use-case'
import { makeTransaction } from 'tests/factories/make-transaction'
import { generateId } from '@/core/utils/generate-id'
import { ITransactionBlockchainRepository } from '../../repositories/transaction-blockchain-repository'
import { SQLiteTransactionBlockchainRepository } from '@/infra/blockchain/repositories/sqlite-transaction-blockchain-repository'
import { LocalTransactionContract } from '@/infra/blockchain/contracts/array-transaction-contract'
import fs from 'fs'

describe('Get Account Balance Use Case', () => {
  let sut: GetAccountBalanceUseCase
  let blockchainRepository: ITransactionBlockchainRepository
  let transactionContract: ITransactionContract

  beforeEach(async () => {
    blockchainRepository = new SQLiteTransactionBlockchainRepository();
    transactionContract = new LocalTransactionContract(blockchainRepository)
    sut = new GetAccountBalanceUseCase(transactionContract)
    await blockchainRepository.clearTables()
  })

  afterEach(async () => {
    await blockchainRepository.clearTables()
  })

  it('should calculate the account balance correctly when there are transactions', async () => {
    const accountId = 'testAccountId'
    const transactionPayloads = [
      makeTransaction({ amount: 100 }),
      makeTransaction({ payeeId: accountId, amount: 200 }),
      makeTransaction({ payerId: accountId, amount: 75 }),
      makeTransaction({ amount: 75 }),
      makeTransaction({ payerId: accountId, amount: 75 })
    ]

    await Promise.all(
      transactionPayloads.map((transaction) =>
        transactionContract.createTransaction({
          id: generateId(),
          ...transaction,
          verifiedAt: new Date()
        })
      )
    )

    const result = await sut.execute({ accountId })

    expect(result.balance).toBe(50) // 200 - 75 - 75
  })

  it('should return 0 balance when there are no transactions', async () => {
    const accountId = 'wrong-id'

    const result = await sut.execute({ accountId })

    expect(result.transactionsNumber).toBe(0)
    expect(result.balance).toBe(0)
  })
})
