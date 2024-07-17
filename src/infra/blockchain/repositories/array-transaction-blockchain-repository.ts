import { generateHash, IBlock, ITransactionBlockchainRepository } from "@/domain/transaction/repositories/transaction-blockchain-repository";


export class ArrayTransactionBlockchainRepository implements ITransactionBlockchainRepository {
    private blocks: IBlock[] = [];

    constructor() {
        this.createGenesisBlock()
    }

    async clearTables(): Promise<void> {
        this.blocks = []
    }

    async addBlock(block: IBlock): Promise<IBlock> {
        this.blocks.push(block);
        return block
    }

    async createGenesisBlock(): Promise<IBlock> {
        const genesisBlock: IBlock = {
            data: "genesis",
            hash: generateHash("genesis"),
            previousHash: generateHash("0")
        }

        this.blocks.push(genesisBlock);

        return genesisBlock
    }

    async getAllBlocks(): Promise<IBlock[]> {
        return this.blocks
    }

    async getBlockByHash(hash: string): Promise<IBlock | null> {
        return this.blocks.find(block => block.hash === hash) || null
    }

    async getLastBlock(): Promise<IBlock> {
        return this.blocks[this.blocks.length - 1]
    }
}