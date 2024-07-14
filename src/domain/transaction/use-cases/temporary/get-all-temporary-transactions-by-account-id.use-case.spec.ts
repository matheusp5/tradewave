import { InMemoryTemporaryTransactionRepository } from 'tests/repositories/in-memory-temporary-transaction-repository'
import { ITemporaryTransactionRepository } from '../../repositories/temporary-transactions-repository'
import { GetAllTemporaryTransactionsByAccountIdUseCase } from './get-all-temporary-transactions-by-account-id.use-case'
import { makeTransaction } from 'tests/factories/make-transaction'

describe('Get All Temporary Transactions By Account Id Use Case', () => {
  let sut: GetAllTemporaryTransactionsByAccountIdUseCase
  let temporaryTransactionRepository: ITemporaryTransactionRepository

  beforeEach(() => {
    temporaryTransactionRepository =
      new InMemoryTemporaryTransactionRepository()
    sut = new GetAllTemporaryTransactionsByAccountIdUseCase(
      temporaryTransactionRepository
    )
  })

  it('should return all temporary transactions for a given account ID', async () => {
    const accountId = '123456789'
    const transactionsPayload = [
      makeTransaction({ payerId: accountId }),
      makeTransaction({ payeeId: accountId }),
      makeTransaction({ payeeId: accountId })
    ]
    await Promise.all(
      transactionsPayload.map((transaction) =>
        temporaryTransactionRepository.createTemporaryTransaction(transaction)
      )
    )

    const { transactions } = await sut.execute({ accountId })

    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i]
      const isIdCorrect =
        transaction.payeeId === accountId || transaction.payerId === accountId
      expect(isIdCorrect).toBe(true)
      expect(transaction.amount).toBe(transactionsPayload[i].amount)
    }
    expect(transactions.length).toBe(3)
  })
})
