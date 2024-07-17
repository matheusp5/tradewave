import { logger } from '@/core/logger'
import { app } from './app'
import env from '@/infra/env'
import mongoose from 'mongoose'

const main = async () => {
  await mongoose.connect(env.databaseUrl)
  logger.info('Connected to database 📦')

  const address = await app.listen({ port: env.port })
  logger.info(`Server listening on ${address} 🚀`)
}

main().catch((error) => {
  logger.error(error)
  process.exit(1)
})
