import sqlite3, { Database } from 'better-sqlite3';
import { generateHash, IBlock, ITransactionBlockchainRepository } from "@/domain/transaction/repositories/transaction-blockchain-repository";

interface IBlockRow {
    data: string;
    hash: string;
    previousHash: string;
}

export class SQLiteTransactionBlockchainRepository implements ITransactionBlockchainRepository {
    private db: Database;

    constructor() {
        this.db = new sqlite3('blockchain.db');
    }

    async initialize(): Promise<void> {
        await this.createTables();
        await this.createGenesisBlock();
    }

    async clearTables(): Promise<void> {
        try {
            const deleteStmt = this.db.prepare("DELETE FROM blocks");
            this.db.transaction(() => {
                deleteStmt.run();
            })();
        } catch (error) {
            console.error(error);
        }
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
        const exists = this.db.prepare("SELECT 1 FROM blocks WHERE data = 'genesis'").get();
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
        const rows = this.db.prepare("SELECT data, hash, previousHash FROM blocks").all() as IBlockRow[];
        if (rows) {
            return rows.map((row: IBlockRow) => ({
                data: row.data,
                hash: row.hash,
                previousHash: row.previousHash
            }));
        }
        return []
    }

    async getBlockByHash(hash: string): Promise<IBlock | null> {
        const row = this.db.prepare("SELECT data, hash, previousHash FROM blocks WHERE hash = ?").get(hash) as IBlockRow;
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
        const row = this.db.prepare("SELECT data, hash, previousHash FROM blocks ORDER BY id DESC LIMIT 1").get() as IBlockRow;
        return {
            data: row.data,
            hash: row.hash,
            previousHash: row.previousHash
        };
    }
}
