import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { AnyObjectSchema } from 'yup'
import { BadRequestError } from '@/core/errors/bad-request.error'

const httpValidate =
  <T extends AnyObjectSchema>(schema: T) =>
  async (req: FastifyRequest, _: FastifyReply) => {
    try {
      const validatedData = await schema.validate(
        {
          body: req.body,
          query: req.query,
          params: req.params
        },
        { abortEarly: false }
      )

      req.body = validatedData.body
      req.query = validatedData.query
      req.params = validatedData.params
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        throw new BadRequestError(error.errors.join(', '))
      }

      throw new BadRequestError(error.message)
    }
  }

export { httpValidate }
