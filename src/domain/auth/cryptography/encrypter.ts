import { TokenType } from "@/core/enums/token-type"

export interface IEncryptRequest {
    sub: string
    type: TokenType
}

export interface IEncrypterResponse {
    token: string
    expiresAt: Date
}

export interface IDecryptRequest {
    token: string
}

export interface IDecryptResponse {
    sub: string
    type: TokenType
}

export interface IEncrypter {
    encrypt(data: IEncryptRequest): IEncrypterResponse
    decrypt(data: IDecryptRequest): IDecryptResponse
}