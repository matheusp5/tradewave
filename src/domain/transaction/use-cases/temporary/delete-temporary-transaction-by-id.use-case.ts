import { IUseCase } from '@/core/types/use-case'
import { Transaction } from '../../entities/transaction'
import { ITemporaryTransactionRepository } from '../../repositories/temporary-transactions-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'
import { Account } from '@/domain/auth/entities/account'
import { UnauthorizedError } from '@/core/errors/unauthorized.error'

interface IDeleteTemporaryTransactionByIdUseCaseRequest {
  transactionId: string
  requester: Account
}

interface IDeleteTemporaryTransactionByIdUseCaseResponse {
  transaction: Transaction
}

export class DeleteTemporaryTransactionByIdUseCase
  implements
    IUseCase<
      IDeleteTemporaryTransactionByIdUseCaseRequest,
      Promise<IDeleteTemporaryTransactionByIdUseCaseResponse>
    >
{
  constructor(
    private temporaryTransactionRepository: ITemporaryTransactionRepository
  ) {}

  async execute({
    transactionId,
    requester
  }: IDeleteTemporaryTransactionByIdUseCaseRequest): Promise<IDeleteTemporaryTransactionByIdUseCaseResponse> {
    const transaction =
      await this.temporaryTransactionRepository.getTemporaryTransactionById(
        transactionId
      )

    if (!transaction)
      throw new ResourceNotFoundError('Transação temporária não encontrada.')
    if (transaction.payerId !== requester.id)
      throw new UnauthorizedError(
        'Você não tem permissão para deletar essa transação.'
      )

    await this.temporaryTransactionRepository.deleteTemporaryTransactionById(
      transactionId
    )

    return { transaction }
  }
}
