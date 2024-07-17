import {
  ILoginWithEmailAndPasswordDTO,
  IRefreshAuthDTO,
  IRegisterAccountDTO
} from '@/domain/auth/dtos/auth.dto'
import { AuthFactory } from '@/domain/auth/factories/auth.factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { AccountPresenter } from '../presenters/account.presenter'
import { TransactionFactory } from "@/domain/transaction/factories/transaction.factory";

const authService = AuthFactory.services()

export class AuthController {
  static async login(
    req: FastifyRequest<{ Body: ILoginWithEmailAndPasswordDTO }>,
    reply: FastifyReply
  ) {
    const { email, password } = req.body

    const { account, tokens } = await authService.login({ email, password })

    reply.send({
      account: AccountPresenter.toHttp(account),
      tokens
    })
  }

  static async register(
    req: FastifyRequest<{ Body: IRegisterAccountDTO }>,
    reply: FastifyReply
  ) {
    const { account, tokens } = await authService.register(req.body)

    reply.send({
      account: AccountPresenter.toHttp(account),
      tokens
    })
  }

  static async me(req: FastifyRequest, reply: FastifyReply) {
    const {account, balance } = await authService.me({requester: req.account})
    reply.send({
      ...AccountPresenter.toHttp(account),
      ...balance
    })
  }

  static async refreshAuth(
    req: FastifyRequest<{ Body: IRefreshAuthDTO }>,
    reply: FastifyReply
  ) {
    const { tokens } = await authService.refreshAuth(req.body)

    reply.send({
      tokens
    })
  }
}
