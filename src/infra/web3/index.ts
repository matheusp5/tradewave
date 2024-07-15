import Web3 from 'web3';
import { abi } from '../../../build/contracts/Bank.json';

export class Web3BlochchainProvider {
    static async getBankContract() {
        const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        const bankContract = new web3.eth.Contract(abi);
        return { web3, bankContract }
    }
}
