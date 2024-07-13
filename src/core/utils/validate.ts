import { Schema, ValidationError } from 'yup'
import { BadRequestError } from '../errors/bad-request.error'

export async function validate(
    schema: Schema<any>,
    data: unknown,
    error?: Error
) {
    await schema
        .validate(data, {
            abortEarly: false,
        })
        .catch((err: ValidationError) => {
            if (error) {
                throw error
            }

            throw new BadRequestError(err.errors.join(', '))
        })
}