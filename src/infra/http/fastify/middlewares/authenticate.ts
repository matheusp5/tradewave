import { UnauthorizedError } from '@/core/errors/unauthorized.error'
import { AuthFactory } from '@/domain/auth/factories/auth.factory'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1]

    if (!accessToken) {
      throw new UnauthorizedError('Token inválido')
    }

    const authServices = AuthFactory.services()

    const { account } = await authServices.verifyToken({ token: accessToken })

    req['account'] = account;
  } catch (error: any) {
    return reply.status(401).send({ error: error.message })
  }
}
