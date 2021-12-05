const contractService = require('../services/ContractService')

class ContractController {

    async getById({id, profileId}) {
        return await contractService.getById({id, profileId})
    }

    async getAll(profileId) {
        return await contractService.getAll(profileId)
    }
}

module.exports = new ContractController()
