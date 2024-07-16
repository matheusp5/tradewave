import { ITransactionContract } from '../../blockchain/transaction-contract'
import { GetTransactionsByAccountIdUseCase } from './get-transactions-by-account-id.use-case'
import { makeTransaction } from 'tests/factories/make-transaction'
import { generateId } from '@/core/utils/generate-id'
import { SQLiteTransactionBlockchainRepository } from '@/infra/blockchain/repositories/sqlite-transaction-blockchain-repository'
import { LocalTransactionContract } from '@/infra/blockchain/contracts/array-transaction-contract'

describe('Get Transactions By Account ID Use Case', () => {
  let sut: GetTransactionsByAccountIdUseCase
  let transactionContract: ITransactionContract

  beforeEach(async () => {
    const blockchainTransaction = new SQLiteTransactionBlockchainRepository();
    transactionContract = new LocalTransactionContract(blockchainTransaction)
    sut = new GetTransactionsByAccountIdUseCase(transactionContract)
  })

  it('should get transactions by account id', async () => {
    const accountId = 'test'
    const transactionsPayload = [
      makeTransaction({ payerId: accountId }),
      makeTransaction({ payeeId: accountId }),
      makeTransaction(),
      makeTransaction({ payeeId: accountId }),
      makeTransaction()
    ]

    await Promise.all(
      transactionsPayload.map((transaction) =>
        transactionContract.createTransaction({
          id: generateId(),
          ...transaction,
          verifiedAt: new Date()
        })
      )
    )

    const { transactions } = await sut.execute({ accountId })

    for (const transaction of transactions) {
      const isPayer = transaction.payerId === accountId
      const isPayee = transaction.payeeId === accountId

      expect(isPayer || isPayee).toBe(true)
    }
  })

  it('should return an empty array when there are no transactions', async () => {
    const accountId = 'wrong-id'

    const { transactions } = await sut.execute({ accountId })

    expect(transactions.length).toBe(0)
  })
})
