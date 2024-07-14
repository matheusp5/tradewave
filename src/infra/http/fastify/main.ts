import { logger } from '@/core/logger'
import { app } from './app'
import env from '@/infra/env'

const main = async () => {
  const address = await app.listen({ port: env.port })
  logger.info(`Server listening on ${address} 🚀`)
}

main().catch((error) => {
  logger.error(error)
  process.exit(1)
})
