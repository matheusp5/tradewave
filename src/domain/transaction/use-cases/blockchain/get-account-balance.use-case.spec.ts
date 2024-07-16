import { ITransactionContract } from '../../blockchain/transaction-contract'
import { GetAccountBalanceUseCase } from './get-account-balance.use-case'
import { makeTransaction } from 'tests/factories/make-transaction'
import { generateId } from '@/core/utils/generate-id'
import { EventStoreDBClient } from '@eventstore/db-client'
import { ArrayTransactionBlockchainRepository } from '@/infra/blockchain/repositories/array-transaction-blockchain-repository'
import { ArrayTransactionContract } from '@/infra/blockchain/contracts/array-transaction-contract'

describe('Get Account Balance Use Case', () => {
  let sut: GetAccountBalanceUseCase
  let transactionContract: ITransactionContract

  beforeEach(async () => {
    const blockchainRepository = new ArrayTransactionBlockchainRepository();
    transactionContract = new ArrayTransactionContract(blockchainRepository)
    sut = new GetAccountBalanceUseCase(transactionContract)
  })

  it('should calculate the account balance correctly when there are transactions', async () => {
    const accountId = 'testAccountId'
    const transactions = [
      makeTransaction({ amount: 100 }),
      makeTransaction({ payeeId: accountId, amount: 200 }),
      makeTransaction({ payerId: accountId, amount: 75 }),
      makeTransaction({ amount: 75 }),
      makeTransaction({ payerId: accountId, amount: 75 })
    ]
    await Promise.all(
      transactions.map((transaction) =>
        transactionContract.createTransaction({
          ...transaction,
          id: generateId(),
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
