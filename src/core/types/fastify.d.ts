import { Account } from '@/domain/authentication/entities/account'
import fastify from 'fastify'

declare module 'fastify' {
    export interface FastifyRequest {
        account: Account
    }
}