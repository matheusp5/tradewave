import { BadRequestError } from '@/core/errors/bad-request.error'
import bcrypt from 'bcrypt'

export class Password {
    private static PASSWORD_SALT_ROUNDS: number = 6 as const
    public hash: string

    private constructor(password: string) {
        this.hash = password
    }

    static loadPassword(hash: string): Password {
        return new Password(hash)
    }

    static createNewPassword(password: string): Password {
        if (!this.isPasswordValid(password)) {
            throw new BadRequestError('Senha inválida. A senha conter ao menos 6 caracteres.')
        }

        return new Password(this.generateHash(password))
    }

    private static isPasswordValid(password: string): boolean {
        if (!password || password.trim().length < 6) return false

        return true
    }

    public async comparePasswords(plainTextPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainTextPassword, this.hash)
    }

    private static generateHash(plainPassword: string): string {
        return bcrypt.hashSync(plainPassword, Password.PASSWORD_SALT_ROUNDS)
    }
}