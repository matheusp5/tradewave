import { JwtEncrypter } from "@/infra/cryptography/jwt-encrypter";
import { IEncrypter } from "../../cryptography/encrypter";
import { VerifyTokenUseCase } from "./verify-token.use-case";
import { TokenType } from "@/core/enums/token-type";
import { UnauthorizedError } from "@/core/errors/unauthorized.error";

let sut: VerifyTokenUseCase;
let encrypter: IEncrypter

describe('Verify Token Use Case', () => {
    beforeAll(() => {
        encrypter = new JwtEncrypter()
        sut = new VerifyTokenUseCase(encrypter)
    })

    it('should verify a valid token', () => {
        const accountId = "12345"
        const type = TokenType.ACCESS

        const { token } = encrypter.encrypt({ sub: accountId, type })

        const verifyTokenResponse = sut.execute({ token })

        expect(verifyTokenResponse.id).toBe(accountId)
        expect(verifyTokenResponse.type).toBe(type)
    })

    it('should throw if token is invalid', () => {
        const invalidToken = "pipoca"

        expect(() => sut.execute({ token: invalidToken })).toThrow(UnauthorizedError)
    })
})