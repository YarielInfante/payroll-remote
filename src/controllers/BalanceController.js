const balanceService = require('../services/BalanceService')

class BalanceController {


    async deposit({clientId, amount}) {
        return await balanceService.deposit({clientId, amount})
    }
}

module.exports = new BalanceController()
