import pino from 'pino'

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      levelFirst: true,
      colorize: true,
      translateTime: 'dd/mm/yyyy HH:MM:ss'
    }
  }
})

export { logger }
