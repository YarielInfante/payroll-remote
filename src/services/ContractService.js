const {Contract} = require("../../src/model/model");
const {Op} = require("sequelize");

class ContractService {

    async getById({id, profileId}) {
        return await Contract.findOne({where: {id, [Op.or]: [{contractorId: profileId}, {clientId: profileId}]}})
    }

    async getAll(profileId) {
        return await Contract.findAll({
            where: {
                [Op.or]: [{contractorId: profileId}, {clientId: profileId}],
                status: 'in_progress'
            }
        })
    }
}

module.exports = new ContractService()
