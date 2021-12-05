const {Job, Contract, Profile} = require("../model/model");
const {Op} = require("sequelize");
const DEFAULT_LIMIT = 2

class AdminService {

    async getBestProfessionsByDate({start, end, limit}) {

        return await Job.findAll({
            attributes: [Job.sequelize.col('profession'), [Job.sequelize.fn('sum', Job.sequelize.col('price')), 'price']],
            include: [
                {
                    model: Contract,
                    include: [
                        {
                            model: Profile, as: 'contractor',
                            where: {
                                type: 'contractor'
                            },
                            attributes: ['type', 'profession']
                        }
                    ]
                }
            ],
            where: {
                paid: true,
                paymentDate: {[Op.between]: [start, end]},
            },
            group: ['profession'],
            limit: limit ?? DEFAULT_LIMIT
        })
    }

    async getBestClientsByDate({start, end, limit}) {

        return await Job.findAll({
            attributes: ['Contract->client.id', [Job.sequelize.fn('sum', Job.sequelize.col('price')), 'price']],
            include: [
                {
                    model: Contract,
                    include: [
                        {
                            model: Profile, as: 'client',
                        }
                    ]
                }
            ],
            where: {
                paid: true,
                paymentDate: {[Op.between]: [start, end]},
            },
            group: ['Contract->client.id'],
            limit: limit ?? DEFAULT_LIMIT
        })
    }

}

module.exports = new AdminService()
