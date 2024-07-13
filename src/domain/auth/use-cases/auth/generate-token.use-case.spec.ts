import { JwtEncrypter } from "@/infra/cryptography/jwt-encrypter";
import { IEncrypter } from "../../cryptography/encrypter";
import { GenerateTokenUseCase } from "./generate-token.use-case";
import { TokenType } from "@/core/enums/token-type";
import moment from "moment";

let sut: GenerateTokenUseCase;
let encrypter: IEncrypter;

describe("Generate Token Use Case", () => {
    beforeAll(() => {
        encrypter = new JwtEncrypter()
        sut = new GenerateTokenUseCase(encrypter)
    })

    it('should generate a token', async () => {
        const accountId = "teste"

        const createTokenResponse = await sut.execute({ id: accountId, type: TokenType.ACCESS })

        expect(createTokenResponse.token).toBeTruthy()
        expect(typeof createTokenResponse.token).toBe("string")
        expect(createTokenResponse.expiresAt > moment().toDate()).toBeTruthy()
    })
})