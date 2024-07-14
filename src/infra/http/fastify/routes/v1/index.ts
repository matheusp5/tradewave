import { FastifyInstance } from 'fastify'
import { accountRoutes } from './account.routes'
import { authRoutes } from './auth.routes'
import { transactionRoutes } from './transaction.routes'

interface IRoute {
    path: string
    route: (app: FastifyInstance) => Promise<void>
}

const v1Routes: IRoute[] = [
    { path: '/v1/account', route: accountRoutes },
    { path: '/v1/auth', route: authRoutes },
    { path: '/v1/transaction', route: transactionRoutes }
]

export default v1Routes