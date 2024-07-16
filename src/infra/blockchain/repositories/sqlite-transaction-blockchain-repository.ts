import sqlite3, { Database } from 'better-sqlite3';
import { generateHash, IBlock, ITransactionBlockchainRepository } from "@/domain/transaction/repositories/transaction-blockchain-repository";

export class SQLiteTransactionBlockchainRepository implements ITransactionBlockchainRepository {
    private db: Database;

    constructor() {
        this.db = new sqlite3('blockchain.db');
        this.createTables();
        this.createGenesisBlock();
    }

    private createTables(): void {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS blocks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                data TEXT NOT NULL,
                hash TEXT NOT NULL,
                previousHash TEXT NOT NULL
            );
        `);
    }

    async addBlock(block: IBlock): Promise<IBlock> {
        const stmt = this.db.prepare(`
            INSERT INTO blocks (data, hash, previousHash)
            VALUES (?, ?, ?)
        `);
        stmt.run(block.data, block.hash, block.previousHash);
        return block;
    }

    async createGenesisBlock(): Promise<IBlock> {
        const exists = this.db.prepare("SELECT 1 FROM blocks WHERE id = 1").get();
        if (exists) {
            return (await this.getBlockByHash(generateHash("genesis"))) as IBlock;
        }

        const genesisBlock: IBlock = {
            data: "genesis",
            hash: generateHash("genesis"),
            previousHash: generateHash("0")
        };

        await this.addBlock(genesisBlock);

        return genesisBlock;
    }

    async getAllBlocks(): Promise<IBlock[]> {
        const rows: any = this.db.prepare("SELECT data, hash, previousHash FROM blocks").all();
        return rows.map((row: any) => ({
            data: row.data,
            hash: row.hash,
            previousHash: row.previousHash
        }));
    }

    async getBlockByHash(hash: string): Promise<IBlock | null> {
        const row: any = this.db.prepare("SELECT data, hash, previousHash FROM blocks WHERE hash = ?").get(hash);
        if (row) {
            return {
                data: row.data,
                hash: row.hash,
                previousHash: row.previousHash
            };
        }
        return null;
    }

    async getLastBlock(): Promise<IBlock> {
        const row: any = this.db.prepare("SELECT data, hash, previousHash FROM blocks ORDER BY id DESC LIMIT 1").get();
        return {
            data: row.data,
            hash: row.hash,
            previousHash: row.previousHash
        };
    }
}
