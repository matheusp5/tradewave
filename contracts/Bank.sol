// contracts/Bank.sol
pragma solidity ^0.8.0;

contract Bank {
    struct Transaction {
        uint id;
        address payer;
        address payee;
        uint amount;
        uint createdAt;
        uint verifiedAt;
    }

    uint public transactionCount = 0;
    mapping(uint => Transaction) public transactions;
    mapping(address => uint[]) public userTransactions;

    event TransactionCreated(uint id, address payer, address payee, uint amount, uint createdAt);

    function createTransaction(address _payee, uint _amount) public {
        transactionCount++;
        transactions[transactionCount] = Transaction(transactionCount, msg.sender, _payee, _amount, block.timestamp, 0);
        userTransactions[msg.sender].push(transactionCount);
        userTransactions[_payee].push(transactionCount);
        emit TransactionCreated(transactionCount, msg.sender, _payee, _amount, block.timestamp);
    }

    function getUserTransactions(address _user) public view returns (uint[] memory) {
        return userTransactions[_user];
    }
}
