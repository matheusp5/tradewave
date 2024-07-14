import { InMemoryTemporaryTransactionRepository } from 'tests/repositories/in-memory-temporary-transaction-repository'
import { ITemporaryTransactionRepository } from '../../repositories/temporary-transactions-repository'
import { DeleteTemporaryTransactionByIdUseCase } from './delete-temporary-transaction-by-id.use-case'
import { makeTransaction } from 'tests/factories/make-transaction'
import { generateId } from '@/core/utils/generate-id'
import { makeAccount } from 'tests/factories/make-account'
import { IAccountRepository } from '@/domain/auth/repositories/account-repository'
import { InMemoryAccountRepository } from 'tests/repositories/in-memory-account-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { UnauthorizedError } from '@/core/errors/unauthorized.error'

describe('Delete Temporary Transaction By Id Use Case', () => {
  let sut: DeleteTemporaryTransactionByIdUseCase
  let temporaryTransactionRepository: ITemporaryTransactionRepository
  let accountRepository: IAccountRepository

  beforeEach(() => {
    temporaryTransactionRepository =
      new InMemoryTemporaryTransactionRepository()
    accountRepository = new InMemoryAccountRepository()
    sut = new DeleteTemporaryTransactionByIdUseCase(
      temporaryTransactionRepository
    )
  })

  it('should delete a temporary transaction by id', async () => {
    const payeePayload = makeAccount()
    const payerPayload = makeAccount()

    const payee = await accountRepository.create(payeePayload)
    const payer = await accountRepository.create(payerPayload)

    const transactionPayload = makeTransaction({
      payeeId: payee.id,
      payerId: payer.id
    })
    const createTransactionResponse =
      await temporaryTransactionRepository.createTemporaryTransaction(
        transactionPayload
      )

    await sut.execute({
      transactionId: createTransactionResponse.id,
      requester: payer
    })

    const deletedTransaction =
      await temporaryTransactionRepository.getTemporaryTransactionById(
        createTransactionResponse.id
      )

    expect(deletedTransaction).toBeNull()
  })

  it('should throw a ResourceNotFoundError if the temporary transaction does not exist', async () => {
    const transactionId = 'non-existent-id'
    const accountPayload = makeAccount()

    const account = await accountRepository.create(accountPayload)

    await expect(
      sut.execute({ transactionId, requester: account })
    ).rejects.toThrow(ResourceNotFoundError)
  })

  it('should throw an UnauthorizedError if the requester is not the payer of the temporary transaction', async () => {
    const transactionPayload = makeTransaction()
    const accountPayload = makeAccount()
    const account = await accountRepository.create(accountPayload)

    const transaction =
      await temporaryTransactionRepository.createTemporaryTransaction(
        transactionPayload
      )

    await expect(
      sut.execute({ transactionId: transaction.id, requester: account })
    ).rejects.toThrow(UnauthorizedError)
  })
})
