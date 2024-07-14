import { AccountFactory } from '@/domain/auth/factories/account.factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { AccountPresenter } from '../presenters/account.presenter'
import {
  IShowAccountByEmailDTO,
  IShowAccountByIdDTO,
  IShowAccountByUsernameDTO
} from '@/domain/auth/dtos/account.dto'


const accountService = AccountFactory.services()

export class AccountController {
  static async showById(
    req: FastifyRequest<{ Params: IShowAccountByIdDTO }>,
    reply: FastifyReply
  ) {
    const accountService = AccountFactory.services()

    const { id } = req.params
    const { account } = await accountService.showAccountById({ id })

    reply.send({
      account: AccountPresenter.toHttp(account)
    })
  }

  static async showByUsername(
    req: FastifyRequest<{ Params: IShowAccountByUsernameDTO }>,
    reply: FastifyReply
  ) {

    const { username } = req.params
    const { account } = await accountService.showAccountByUsername({ username })

    reply.send({
      account: AccountPresenter.toHttp(account)
    })
  }

  static async showByEmail(
    req: FastifyRequest<{ Params: IShowAccountByEmailDTO }>,
    reply: FastifyReply
  ) {

    const { email } = req.params
    const { account } = await accountService.showAccountByEmail({ email })

    reply.send({
      account: AccountPresenter.toHttp(account)
    })
  }

  static async delete(req: FastifyRequest, reply: FastifyReply) {
    await accountService.deleteAccount({ requester: req.account })

    reply.send({
      account: AccountPresenter.toHttp(req.account)
    })
  }
}
