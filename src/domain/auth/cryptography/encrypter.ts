import { TokenType } from "@/core/enums/token-type"

export interface IEncryptRequest {
    sub: string
    type: TokenType
}

export interface IEncryptResponse {
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
    encrypt(data: IEncryptRequest): IEncryptResponse
    decrypt(data: IDecryptRequest): IDecryptResponse
}