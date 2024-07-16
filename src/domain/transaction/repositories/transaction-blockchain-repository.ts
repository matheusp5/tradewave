import { sha256 } from "ethereum-cryptography/sha256";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils";

export interface IBlock {
    data: string
    hash: string
    previousHash: string
}


export const generateHash = (data: string): string => {
    const stringToUTF8: Uint8Array = utf8ToBytes(data);
    const hash: Uint8Array = sha256(stringToUTF8);
    const hexaDecimalHash: string = toHex(hash);
    return hexaDecimalHash;
};


export interface ITransactionBlockchainRepository {
    addBlock(block: IBlock): Promise<IBlock>
    createGenesisBlock(): Promise<IBlock>
    getAllBlocks(): Promise<IBlock[]>
    getBlockByHash(hash: string): Promise<IBlock | null>
    getLastBlock(): Promise<IBlock>
    clearTables(): Promise<void>
}