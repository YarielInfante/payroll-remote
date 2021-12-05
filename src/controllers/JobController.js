const jobService = require('../services/JobService')

class JobController {

    async getUnpaid(profileId) {
        return (await jobService.getUnpaid(profileId)).map(this.serialize)
    }


    async pay({jobId, idClient}) {
        return await jobService.pay({jobId, idClient})
    }


    serialize(job) {
        return {
            id: job.id,
            contractId: job.ContractId,
            description: job.description,
            paid: job.paid,
            paymentDate: job.paymentDate,
        }
    }

}

module.exports = new JobController()
