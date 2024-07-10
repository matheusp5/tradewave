const shim = require('fabric-shim')

var BankSystem = class {
  async Init(stub) {
    console.info('========= BankSystem Init =========')
    return shim.success()
  }

  async Invoke(stub) {
    let ret = stub.getFunctionAndParameters()
    console.info(ret)
    let method = this[ret.fcn]
    if (!method) {
      console.log('no method of name:' + ret.fcn + ' found')
      return shim.success()
    }
    try {
      let payload = await method(stub, ret.params)
      return shim.success(payload)
    } catch (err) {
      console.log(err)
      return shim.error(err)
    }
  }

  async createTransaction(stub, args) {
    if (args.length != 3) {
      throw new Error('Incorrect number of arguments. Expecting 3')
    }

    let fromId = args[0]
    let toId = args[1]
    let amount = parseInt(args[2])

    if (!fromId || !toId || typeof amount !== 'number' || amount <= 0) {
      throw new Error('Invalid transaction arguments')
    }

    let transactionId = `${fromId}-${toId}-${Date.now()}`
    let transaction = {
      from: fromId,
      to: toId,
      amount: amount,
      timestamp: new Date().toISOString()
    }

    await stub.putState(transactionId, Buffer.from(JSON.stringify(transaction)))
    console.info(`Transaction created: ${JSON.stringify(transaction)}`)
  }

  async queryTransactions(stub, args) {
    if (args.length != 1) {
      throw new Error('Incorrect number of arguments. Expecting 1')
    }

    let userId = args[0]
    let queryString = {
      selector: {
        $or: [{ from: userId }, { to: userId }]
      }
    }

    let iterator = await stub.getQueryResult(JSON.stringify(queryString))
    let allResults = []
    while (true) {
      let res = await iterator.next()
      if (res.value && res.value.value.toString()) {
        let jsonRes = {}
        console.log(res.value.value.toString('utf8'))

        jsonRes.Key = res.value.key
        try {
          jsonRes.Record = JSON.parse(res.value.value.toString('utf8'))
        } catch (err) {
          console.log(err)
          jsonRes.Record = res.value.value.toString('utf8')
        }
        allResults.push(jsonRes)
      }
      if (res.done) {
        console.log('end of data')
        await iterator.close()
        console.info(allResults)
        return Buffer.from(JSON.stringify(allResults))
      }
    }
  }
}

shim.start(new BankSystem())
