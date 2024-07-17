import { IUseCase } from '@/core/types/use-case'
import { Transaction } from '../../entities/transaction'
import { ITemporaryTransactionRepository } from '../../repositories/temporary-transactions-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error'

interface IGetTemporaryTransactionByIdUseCaseRequest {
  transactionId: string
}

interface IGetTemporaryTransactionByIdUseCaseResponse {
  transaction: Transaction
}

export class GetTemporaryTransactionByIdUseCase
  implements
  IUseCase<
    IGetTemporaryTransactionByIdUseCaseRequest,
    Promise<IGetTemporaryTransactionByIdUseCaseResponse>
  > {
  constructor(
    private temporaryTransactionRepository: ITemporaryTransactionRepository
  ) { }

  async execute({
    transactionId
  }: IGetTemporaryTransactionByIdUseCaseRequest): Promise<IGetTemporaryTransactionByIdUseCaseResponse> {
    const transaction =
      await this.temporaryTransactionRepository.getTemporaryTransactionById(
        transactionId
      )
    if (!transaction)
      throw new ResourceNotFoundError('Transação temporária não encontrada.')
    return { transaction }
  }
}
