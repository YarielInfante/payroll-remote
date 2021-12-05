const Router = require('express');
const contractController = require('../../controllers/ContractController')

class ContractRoute {

    get router() {
        const router = new Router();

        router.get('/:id', this.getById);
        router.get('/', this.getAll)

        return router;
    }


    async getById(req, res) {
        const {id} = req.params
        const contract = await contractController.getById({id, profileId: req.profile.id})
        if (!contract) return res.status(404).end()
        res.json(contract)
    }

    async getAll(req, res) {
        res.json(await contractController.getAll(req.profile.id))
    }

}


module.exports = ContractRoute;
