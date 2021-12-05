const {Contract, Job, Profile} = require("../../src/model/model");
const {Op} = require("sequelize");

class JobService {

    async getUnpaid(profileId) {
        return await Job.findAll({
            where: {
                paid: null,
            },
            include: [
                {
                    model: Contract,
                    where: {
                        [Op.or]: [{contractorId: profileId}, {clientId: profileId}],
                        status: 'in_progress'
                    }
                }
            ]
        })
    }


    async pay({jobId, idClient}) {

        const transaction = await Job.sequelize.transaction()
        const options = {transaction, lock: transaction.LOCK.UPDATE}
        try {
            const job = await Job.findOne(
                {
                    where: {id: jobId},
                    include: [
                        {
                            model: Contract,
                            where: {clientId: idClient}
                        }
                    ]
                },
                options
            )
            if (!job)
                return {message: 'Job not found'}

            const {contractorId, clientId} = job.Contract
            const contractorProfile = await Profile.findOne({where: {id: contractorId}}, options)
            const clientProfile = await Profile.findOne({where: {id: clientId}}, options)

            if (clientProfile.balance >= job.price) {
                await contractorProfile.update({balance: contractorProfile.balance + job.price}, {transaction})
                await clientProfile.update({balance: clientProfile.balance - job.price}, {transaction})
                await job.update({paid: true, paymentDate: Date.now()}, {transaction})
                await transaction.commit()
            } else {
                return {message: 'Insufficient balance'}
            }

            return job

        } catch (e) {
            await transaction.rollback()
            console.log(e)
            return {message: 'Job payment could not be made'}
        }
    }
}

module.exports = new JobService()
