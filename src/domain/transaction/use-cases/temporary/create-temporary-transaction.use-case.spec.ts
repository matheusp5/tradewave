import { InMemoryTemporaryTransactionRepository } from 'tests/repositories/in-memory-temporary-transaction-repository'
import { ITemporaryTransactionRepository } from '../../repositories/temporary-transactions-repository'
import { CreateTemporaryTransactionUseCase } from './create-temporary-transaction.use-case'
import { makeTransaction } from 'tests/factories/make-transaction'

describe('Create Temporary Transaction Use Case', () => {
  let sut: CreateTemporaryTransactionUseCase
  let repository: ITemporaryTransactionRepository

  beforeEach(() => {
    repository = new InMemoryTemporaryTransactionRepository()
    sut = new CreateTemporaryTransactionUseCase(repository)
  })

  it('should create a temporary transaction', async () => {
    const transaction = makeTransaction()

    const { transaction: createdTransaction } = await sut.execute(transaction)

    expect(createdTransaction.id).toBeTruthy()
    expect(createdTransaction.payerId).toBe(transaction.payerId)
    expect(createdTransaction.payeeId).toBe(transaction.payeeId)
    expect(createdTransaction.amount).toBe(transaction.amount)
  })
})
