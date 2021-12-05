const Router = require('express');
const adminController = require('../../controllers/AdminController')

class BalanceRoute {

    get router() {
        const router = new Router();

        router.get('/best-profession', this.getBestProfessionsByDate);
        router.get('/best-clients', this.getBestClientsByDate);

        return router;
    }

    async getBestProfessionsByDate(req, res) {
        const {start, end, limit} = req.query
        const response = await adminController.getBestProfessionsByDate({start, end, limit})
        res.json(response)
    }

    async getBestClientsByDate(req, res) {
        const {start, end, limit} = req.query
        const response = await adminController.getBestClientsByDate({start, end, limit})
        res.json(response)
    }

}


module.exports = BalanceRoute;
