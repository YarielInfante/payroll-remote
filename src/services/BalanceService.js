const {Job, Contract, Profile} = require("../model/model");

class BalanceService {


    async deposit({clientId, amount}) {

        const transaction = await Profile.sequelize.transaction()
        const options = {transaction, lock: transaction.LOCK.UPDATE}

        try {
            const clientProfile = await Profile.findOne({where: {id: clientId, type: 'client'}}, options)

            if (!clientProfile) {
                return {message: 'Client not found'}
            }

            if (await this._isWithinLimit({clientId, amount})) {
                const clientProfileUpdated = await clientProfile.update({balance: clientProfile.balance + amount}, {transaction})
                await transaction.commit()
                return clientProfileUpdated
            }
        } catch (e) {
            await transaction.rollback()
            console.log(e)
            return {message: 'Transaction could not complete'}
        }

        return {message: 'Cannot deposit more than 25% your total of jobs to pay'}
    }

    async _isWithinLimit({clientId, amount}) {
        const total = await this._getJobsTotalSum(clientId)
        return total ? amount <= total * 0.25 : true;
    }

    async _getJobsTotalSum(clientId) {
        const jobTotal = await Job.findOne({
            attributes: [[Job.sequelize.fn('sum', Job.sequelize.col('price')), 'price']],
            include: [
                {
                    model: Contract,
                    where: {clientId}
                }
            ],
        })

        if (jobTotal)
            return jobTotal.price
        else
            return undefined
    }
}

module.exports = new BalanceService()
