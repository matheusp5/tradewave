import { CreateTransactionUseCase } from './create-transaction.use-case'
import { ITransactionContract } from '../../blockchain/transaction-contract'
import { Transaction } from '../../entities/transaction'
import { HfTransactionContract } from '@/infra/contracts/hyperledger-fabric/hf-transaction-contract'
import { makeTransaction } from 'tests/factories/make-transaction'
import { generateId } from '@/core/utils/generate-id'

describe('Create Transaction (Blockchain) Use Case', () => {
  let sut: CreateTransactionUseCase
  let transactionContract: ITransactionContract

  beforeEach(() => {
    transactionContract = new HfTransactionContract()
    sut = new CreateTransactionUseCase(transactionContract)
  })

  it('should create a transaction', async () => {
    const transactionPayload = makeTransaction()

    const { transaction } = await sut.execute({
      id: generateId(),
      ...transactionPayload,
      verifiedAt: new Date()
    })

    expect(transaction.payerId).toBe(transactionPayload.payerId)
    expect(transaction.payeeId).toBe(transactionPayload.payeeId)
  })
})
