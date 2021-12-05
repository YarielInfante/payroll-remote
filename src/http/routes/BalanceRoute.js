const Router = require('express');
const balanceController = require('../../controllers/BalanceController')

class BalanceRoute {

    get router() {
        const router = new Router();

        router.post('/deposit', this.deposit);

        return router;
    }


    async deposit(req, res) {
        const {amount} = req.body
        const response = await balanceController.deposit({clientId: req.profile.id, amount})
        if (response && response.message) {
            res.statusCode = 400
            res.json(response)
        }

        res.json(response)
    }

}


module.exports = BalanceRoute;
