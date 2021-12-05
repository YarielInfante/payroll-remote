const Router = require("express");
const jobController = require("../../controllers/JobController");

class JobRoute {

    get router() {
        const router = new Router();

        router.get('/unpaid', this.getUnpaid);
        router.post('/:job_id/pay', this.pay);

        return router;
    }


    async getUnpaid(req, res) {
        const jobs = await jobController.getUnpaid(req.profile.id)
        res.json(jobs)
    }

    async pay(req, res) {
        const {job_id: jobId} = req.params
        const job = await jobController.pay({jobId, idClient: req.profile.id})
        res.json(job)
    }

}


module.exports = JobRoute;
